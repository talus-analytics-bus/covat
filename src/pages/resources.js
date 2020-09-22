import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import Fuse from 'fuse.js'

import Layout from '../components/Layout/Layout'
import DropdownGroup from '../components/DropdownGroup/DropdownGroup'
import Dropdown from '../components/DropdownGroup/Dropdown/Dropdown'

import { filterColumns } from '../../settings/resources'

import styles from '../styles/resources.module.scss'

// import resourcesContents from '../resources/resourcesContents'

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

const imgpath = '/assets/images/resources/'

// non-filterable columns
const infoColumns = ['Name', 'Description', 'Image', 'Link', 'Organization']

const filterSetup = {}
let sortedResources = []
let noResourcesMessage = [
  {
    Name: 'Loading Resources',
    Description: '',
    Organization: '',
    Topic: '',
    Phase: '',
    Image: '',
    Link: '',
  },
]

const Resources = props => {
  const airtableResources = useStaticQuery(graphql`
    query resources {
      allAirtable {
        edges {
          node {
            data {
              Description
              Link
              Name
              Organization
              Topic
              New_Filter
              Image {
                url
              }
            }
          }
        }
      }
    }
  `)

  const resourcesContents = airtableResources.allAirtable.edges.map(
    edge => edge.node.data
  )

  console.log(resourcesContents)

  const [searchString, setSearchString] = React.useState('')
  const [filters, setFilters] = React.useState([])

  React.useEffect(() => {
    // Identify all filterable columns
    console.log(resourcesContents)
    const filterColumns = [
      ...new Set(
        resourcesContents.map(resource => Object.keys(resource)).flat()
      ),
    ].filter(column => !infoColumns.includes(column))

    console.log(filterColumns)

    // Identify unique values in each filterable column
    const filterOptions = filterColumns.map(column => ({
      column: column,
      options: [
        ...new Set(
          resourcesContents
            .map(resource => resource[column].map(s => s.trim()))
            .flat()
        ),
      ],
    }))

    // Create object for each column,
    // containing each filter
    filterOptions.forEach(filter => {
      filterSetup[filter.column] = {}

      filter.options.forEach(string => {
        filterSetup[filter.column][string] = false
      })
    })

    // radndomize the first 5 resources on page load
    const keyResources = resourcesContents.slice(0, 5)
    shuffleArray(keyResources)
    const otherResources = resourcesContents.slice(5)
    shuffleArray(otherResources)

    sortedResources = [...keyResources, ...otherResources]

    console.log(sortedResources)

    setFilters(filterSetup)

    noResourcesMessage = [
      {
        name: 'No resources matching those filters.',
        description:
          'If you have a resource that could help, please consider submitting it through the Contact Us page.',
        organization: '',
        topic: '',
        phase: '',
        image: '',
        link: '',
        focus: '',
      },
    ]
  }, [])

  const searchOptions = {
    isCaseSensitive: false,
    distance: 100,
    shouldSort: true,
    keys: ['name', 'description', 'topic'],
  }

  const fuse = new Fuse(sortedResources, searchOptions)

  let searchedResources = sortedResources
  if (searchString !== '') {
    searchedResources = fuse.search(searchString).map(result => result.item)
  }

  // find which columns have active filters
  // and build array of the filter strings
  const activeFilters = {}
  Object.entries(filters).forEach(([column, options]) => {
    Object.entries(options).forEach(([option, active]) => {
      if (active) {
        if (!activeFilters[column]) {
          activeFilters[column] = []
        }
        activeFilters[column].push(option)
      }
    })
  })

  let filteredResources = searchedResources
  Object.entries(activeFilters).forEach(([column, strings]) => {
    filteredResources = filteredResources.filter(r =>
      strings.some(v => r[column].includes(v))
    )
  })

  if (Object.keys(activeFilters).length === 0) {
    filteredResources = searchedResources
  }

  if (filteredResources.length === 0) {
    filteredResources = noResourcesMessage
  }

  // when the user clicks a checkbox,
  // flip the boolean value for that checkbox
  const onClickCheckbox = (column, option, e) => {
    setFilters({
      ...filters,
      [column]: {
        ...filters[column],
        [option]: !filters[column][option],
      },
    })
  }

  // Create dropdown and checkbox elements based on filters
  const checkboxElements = Object.entries(filters).map(([column, options]) => (
    <Dropdown key={column}>
      <p>
        <strong>{column.replace(/_/g, ' ')}</strong>
      </p>
      {Object.entries(options).map(([option, active]) => (
        <div className={styles.checkboxRow} key={option}>
          <label>
            <input
              type="checkbox"
              name={option}
              checked={active}
              onChange={onClickCheckbox.bind(this, column, option)}
            />
            {option}
          </label>
        </div>
      ))}
    </Dropdown>
  ))

  const activeFiltersElements = Object.entries(activeFilters).map(
    ([column, filters]) => (
      <div key={column} className={styles.column}>
        <h4>
          <strong>{column}</strong>
          {filters.length > 1 ? ' (all selected)' : ''}
        </h4>

        {filters.map(filter => (
          <button
            key={filter}
            onClick={onClickCheckbox.bind(this, column, filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    )
  )

  console.log(filteredResources)

  // create the resources elements
  const resourcesElements = filteredResources.map(r => (
    <div className={styles.resource} key={r.Name}>
      <div className={styles.info}>
        <h2>{r.Topic}</h2>
        <h1>{r.Name}</h1>
        <OutboundLink target="_blank" rel="noopener noreferrer" href={r.Link}>
          {r.Link.split('/').slice(0, 3).join('/')}
        </OutboundLink>
        <p>{r.Description}</p>
      </div>
      {r.Image && (
        <OutboundLink
          target="_blank"
          rel="noopener noreferrer"
          href={r.Link}
          className={styles.image}
        >
          <img src={r.Image[0].url} alt={r.Name + ' Image'} />
        </OutboundLink>
      )}
    </div>
  ))

  return (
    <Layout>
      <Helmet
        title={`COVID Local Resources`}
        meta={[
          {
            name: 'description',
            content:
              'Resources for local leaders managing the COVID-19 pandemic.',
          },
        ]}
      />

      <header className={styles.header}>
        <h1>Recommended Resources</h1>
        <Link to="/contact/">Contact us</Link>
      </header>

      <section className={styles.main}>
        <p>
          These resources are a curated set of information sources and tools
          designed to support and inform operational decisions during the
          COVID-19 response effort. All are publicly-accessible and free to
          access.
        </p>
        <p>
          Resources are tagged by topic and phase of response. Use the filters
          below to find relevant resources. Use the Contact Us button on the
          upper right to share additional resources of interest.
        </p>
        <p style={{ fontStyle: 'italic' }}>
          The COVID-Local Team is not responsible for the content on these
          external pages.
        </p>
        <h3>Filter resources</h3>
        <section className={styles.filterSection}>
          <div className={styles.filters}>
            <DropdownGroup>{checkboxElements}</DropdownGroup>

            <input
              id="search"
              type="text"
              name="search"
              aria-label="Search"
              className={styles.searchbox}
              value={searchString}
              onChange={e => setSearchString(e.target.value)}
              placeholder="search for..."
            />
          </div>

          {Object.keys(activeFilters).length !== 0 && (
            <div className={styles.activeFiltersBackground}>
              <h3 className={styles.activeFiltersTitle}>Selected Filters</h3>
              <section className={styles.activeFilters}>
                {activeFiltersElements}
              </section>
            </div>
          )}
        </section>

        {resourcesElements}
      </section>
    </Layout>
  )
}

export default Resources
