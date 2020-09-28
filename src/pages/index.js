import React from 'react'
import { renderToString } from 'react-dom/server'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { Helmet } from 'react-helmet'
import unified from 'unified'
import markdown from 'remark-parse'
import html from 'remark-html'

import Layout from '../components/Layout/Layout'

import styles from '../styles/index.module.scss'

import placeholder from '../assets/images/placeholder.svg'

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const LandingPage = props => {
  const data = useStaticQuery(graphql`
    query homePage {
      homePageText: allAirtable(filter: { table: { eq: "Home Page Text" } }) {
        nodes {
          data {
            Section_Name
            Markdown
          }
        }
      }
      resources: allAirtable(filter: { table: { eq: "Resources" } }) {
        edges {
          node {
            data {
              Description
              Link
              Name
              Organization
              Topic
              Media_Type
              Image {
                url
              }
            }
          }
        }
      }
      blogPost: allAirtable(
        filter: {
          data: { Publishing_Status: { eq: "Publish" } }
          table: { eq: "Blog" }
        }
        sort: { order: DESC, fields: data___Date }
        limit: 1
      ) {
        edges {
          node {
            id
            data {
              Blog_Text
              Cover_Image {
                url
              }
              Author
              Category
              Date
              Title
              URL
            }
          }
        }
      }
    }
  `)
  const blogpost = data.blogPost.edges[0].node

  console.log(data.resources.edges.map(edge => edge.node.data))

  const [resource] = React.useState(
    shuffleArray(data.resources.edges.map(edge => edge.node.data))[0]
  )

  return (
    <Layout ampOpen={props.ampOpen || false}>
      <Helmet
        title={`Clear COVID: COVID-19 Vaccination experts`}
        meta={[
          {
            name: 'description',
            content: `We are a group of vaccine experts committed 
              to generating unbiased analysis to provide a trusted 
              source of science-based communications and perspectives 
              on progress toward a COVID-19 vaccine. Through engagements 
              with the public, media, health care providers, and public 
              officials, we provide rapid analysis and expert assessment 
              of emerging information, publish commentary and reports, 
              and serve as a respected source for additional information, 
              access to expertise, and resources on the topic.`,
          },
        ]}
      />
      <div className={styles.gradient}>
        <main className={styles.main}>
          <header>
            <div className={styles.left}>
              <h1>
                {
                  data.homePageText.nodes.find(
                    node => node.data.Section_Name === 'Header'
                  ).data.Markdown
                }
              </h1>
              <div
                className={styles.headerTextSection}
                dangerouslySetInnerHTML={{
                  __html: unified()
                    .use(markdown)
                    .use(html)
                    .processSync(
                      data.homePageText.nodes.find(
                        node => node.data.Section_Name === 'Hero Paragraph'
                      ).data.Markdown
                    ),
                }}
              />
              <Link className={styles.buttonlink} to="/about/">
                Meet the Experts
              </Link>
            </div>
            <div className={styles.right}></div>
          </header>
          <div className={styles.cols}>
            <div>
              <h1>
                {
                  data.homePageText.nodes.find(
                    node => node.data.Section_Name === 'Column 1 Caps Header'
                  ).data.Markdown
                }
              </h1>
              <h2>
                {
                  data.homePageText.nodes.find(
                    node => node.data.Section_Name === 'Column 1 Large Header'
                  ).data.Markdown
                }
              </h2>
              <p>
                {
                  data.homePageText.nodes.find(
                    node => node.data.Section_Name === 'Column 1 Text'
                  ).data.Markdown
                }
              </p>
              <Link className={styles.buttonlink} to="/about/">
                {
                  data.homePageText.nodes.find(
                    node => node.data.Section_Name === 'Column 1 Button'
                  ).data.Markdown
                }
              </Link>
            </div>
            <div>
              <h1>
                {
                  data.homePageText.nodes.find(
                    node => node.data.Section_Name === 'Column 2 Caps Header'
                  ).data.Markdown
                }
              </h1>
              <h2>
                {
                  data.homePageText.nodes.find(
                    node => node.data.Section_Name === 'Column 2 Large Header'
                  ).data.Markdown
                }
              </h2>
              {resource !== undefined && (
                <>
                  <h4>
                    <a href={resource.Link}>{resource.Name}</a>
                  </h4>
                  <h3>{resource.Organization}</h3>
                  <p>
                    {resource.Description.length > 250
                      ? resource.Description.split(' ').slice(0, 30).join(' ') +
                        '...'
                      : resource.Description}
                    <br />
                    {/* <a href={resource.Link}> */}
                    {/*   {resource.Link.split('/').slice(0, 3).join('/')} */}
                    {/* </a> */}
                  </p>
                </>
              )}
              <Link className={styles.buttonlink} to="/resources/">
                {
                  data.homePageText.nodes.find(
                    node => node.data.Section_Name === 'Column 2 Button'
                  ).data.Markdown
                }
              </Link>
            </div>
            <div>
              <h1>
                {
                  data.homePageText.nodes.find(
                    node => node.data.Section_Name === 'Column 3 Caps Header'
                  ).data.Markdown
                }
              </h1>
              <h2>
                {
                  data.homePageText.nodes.find(
                    node => node.data.Section_Name === 'Column 3 Large Header'
                  ).data.Markdown
                }
              </h2>
              <h4>
                <Link to={blogpost.data.URL}>{blogpost.data.Title}</Link>
              </h4>
              <h5>{blogpost.data.Date}</h5>
              <section
              // grab the first 250 words, then add an ellipsis
              // if the first paragraph is shorter than 250
              // words, just use that without the ellipsis
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      unified()
                        .use(markdown)
                        .use(html)
                        .processSync(blogpost.data.Blog_Text)
                        // Need to get just the text from the first paragraph
                        .contents.split(/<\/p>/g)[0]
                        .replace('<p>', '')
                        .split(' ')
                        .slice(0, 30)
                        .join(' ') +
                      '... ' +
                      renderToString(
                        <Link to={blogpost.data.URL}>read more</Link>
                      ),
                  }}
                ></p>
              </section>
              <Link className={styles.buttonlink} to="/blog/">
                {
                  data.homePageText.nodes.find(
                    node => node.data.Section_Name === 'Column 3 Button'
                  ).data.Markdown
                }
              </Link>
            </div>
          </div>
          <div className={styles.media}>
            <h1>In the News</h1>
            <div className={styles.logos}>
              <OutboundLink target="_blank" rel="noopener noreferrer" href="#">
                <img src={placeholder} alt="placeholder logo" />
              </OutboundLink>
              <OutboundLink target="_blank" rel="noopener noreferrer" href="#">
                <img src={placeholder} alt="placeholder logo" />
              </OutboundLink>
              <OutboundLink target="_blank" rel="noopener noreferrer" href="#">
                <img src={placeholder} alt="placeholder logo" />
              </OutboundLink>
              <OutboundLink target="_blank" rel="noopener noreferrer" href="#">
                <img src={placeholder} alt="placeholder logo" />
              </OutboundLink>
              <OutboundLink target="_blank" rel="noopener noreferrer" href="#">
                <img src={placeholder} alt="placeholder logo" />
              </OutboundLink>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default LandingPage
