import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout/Layout'

import styles from '../styles/about.module.scss'

// markdown parsing
import unified from 'unified'
import markdown from 'remark-parse'
import html from 'remark-html'

const About = () => {
  const queryResult = useStaticQuery(graphql`
    query aboutPage {
      aboutPageText: allAirtable(filter: { table: { eq: "About Page Text" } }) {
        nodes {
          data {
            Section_Name
            Markdown
            Portrait {
              url
              filename
            }
          }
        }
      }
    }
  `)

  console.log(
    queryResult.aboutPageText.nodes.filter(
      node => node.data.Section_Name === 'Bio'
    )
  )

  const bioSections = queryResult.aboutPageText.nodes
    .filter(node => node.data.Section_Name === 'Bio')
    .map(bio => (
      <div className={styles.bio} key={bio.data.Portrait[0].filename}>
        <img src={bio.data.Portrait[0].url} alt="Portrait" />
        <div
          className={styles.headerTextSection}
          dangerouslySetInnerHTML={{
            __html: unified()
              .use(markdown)
              .use(html)
              .processSync(bio.data.Markdown),
          }}
        />
      </div>
    ))

  return (
    <Layout>
      <Helmet
        title={`Clear COVID Resources`}
        meta={[
          {
            name: 'description',
            content: 'Resources curated by the Clear COVID team of experts.',
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
        <h1 className={styles.bottomBorder}>The Experts</h1>
        {bioSections}
      </section>
    </Layout>
  )
}

export default About
