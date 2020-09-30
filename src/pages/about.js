import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout/Layout'

import styles from '../styles/about.module.scss'

// markdown parsing
import unified from 'unified'
import markdown from 'remark-parse'
import html from 'remark-html'

import talusLogo from '../assets/logos/talus-logo-01.png'
import georgetownLogo from '../assets/logos/Georgetown-small.png'

const About = () => {
  const queryResult = useStaticQuery(graphql`
    query aboutPage {
      aboutPageText: allAirtable(filter: { table: { eq: "About Page Text" } }) {
        nodes {
          data {
            Section_Name
            Markdown
          }
        }
      }
    }
  `)

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
        <footer className={styles.footer}>
          <h1>Supported By</h1>
          <a href="https://ghss.georgetown.edu/" className={styles.georgetown}>
            <img src={georgetownLogo} alt="Georgetown University" />
          </a>
          <a href="http://talusanalytics.com/" className={styles.talus}>
            <img src={talusLogo} alt="Talus Analytics" />
          </a>
        </footer>
      </section>
    </Layout>
  )
}

export default About
