import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { renderToString } from 'react-dom/server'

import Layout from '../components/Layout/Layout'

import styles from '../styles/experts.module.scss'

// markdown parsing
import unified from 'unified'
import markdown from 'remark-parse'
import html from 'remark-html'

// tooltip
import ReactTooltip from 'react-tooltip'

const About = () => {
  const queryResult = useStaticQuery(graphql`
    query expertsPage {
      aboutPageText: allAirtable(
        filter: { table: { eq: "Experts Page Text" } }
      ) {
        nodes {
          data {
            Section_Name
            Markdown
            Portrait {
              url
              filename
            }
            Conflicts_of_Interest
          }
        }
      }
    }
  `)

  const [bioSections] = React.useState(
    queryResult.aboutPageText.nodes
      .filter(node => node.data.Section_Name === 'Bio')
      .reverse()
      .map(bio => (
        <div className={styles.bio} key={bio.data.Markdown}>
          <img src={bio.data.Portrait[0].url} alt="Portrait" />
          <div>
            <div
              className={styles.headerTextSection}
              dangerouslySetInnerHTML={{
                __html: unified()
                  .use(markdown)
                  .use(html)
                  .processSync(bio.data.Markdown),
              }}
            ></div>
            <div
              data-tip={renderToString(
                <div className={styles.tipContainer}>
                  <div className={styles.tipHeader}>
                    <h1>Other interests</h1>
                  </div>
                  <div
                    className={styles.conflictsOfInterest}
                    dangerouslySetInnerHTML={{
                      __html: unified()
                        .use(markdown)
                        .use(html)
                        .processSync(bio.data.Conflicts_of_Interest),
                    }}
                  />
                </div>
              )}
              className={styles.otherInterests}
            >
              <i>Other interests</i>
            </div>
          </div>
        </div>
      ))
  )

  return (
    <Layout>
      <Helmet
        title={`COVAT Resources`}
        meta={[
          {
            name: 'description',
            content: 'Resources curated by the COVAT team of experts.',
          },
        ]}
      />

      <header className={styles.header}>
        <h1>
          {
            queryResult.aboutPageText.nodes.find(
              node => node.data.Section_Name === 'Header'
            ).data.Markdown
          }
        </h1>
        <Link to="/contact/">Contact us</Link>
      </header>

      <section className={styles.main}>
        <div
          className={styles.headerTextSection}
          dangerouslySetInnerHTML={{
            __html: unified()
              .use(markdown)
              .use(html)
              .processSync(
                queryResult.aboutPageText.nodes.find(
                  node => node.data.Section_Name === 'Header Paragraph'
                ).data.Markdown
              ),
          }}
        />
        <h1 className={styles.bottomBorder}>
          {
            queryResult.aboutPageText.nodes.find(
              node => node.data.Section_Name === 'Header'
            ).data.Markdown
          }
        </h1>
        {bioSections}
        <div
          className={styles.disclaimer}
          dangerouslySetInnerHTML={{
            __html: unified()
              .use(markdown)
              .use(html)
              .processSync(
                queryResult.aboutPageText.nodes.find(
                  node => node.data.Section_Name === 'Disclaimer'
                ).data.Markdown
              ),
          }}
        />
      </section>
      <ReactTooltip effect="solid" type="light" html={true} place="right" />
    </Layout>
  )
}

export default About
