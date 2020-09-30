import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout/Layout'

import styles from '../styles/experts.module.scss'

// markdown parsing
import unified from 'unified'
import markdown from 'remark-parse'
import html from 'remark-html'

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
    </Layout>
  )
}

export default About
