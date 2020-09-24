import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import axios from 'axios'

import Layout from '../components/Layout/Layout'

import styles from '../styles/contact.module.scss'

// markdown parsing
import unified from 'unified'
import markdown from 'remark-parse'
import html from 'remark-html'

const Contact = () => {
  const [successMessage, setSuccessMessage] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')
  const [submitButtonText, setSubmitButtonText] = React.useState('Submit')

  const queryResult = useStaticQuery(graphql`
    query contactPage {
      contactPageText: allAirtable(
        filter: { table: { eq: "Contact Page Text" } }
      ) {
        nodes {
          data {
            Section_Name
            Markdown
          }
        }
      }
    }
  `)

  const handleSubmit = event => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target))

    const emptyfields = Object.values(data).some(field => field === '')

    if (emptyfields) {
      setErrorMessage(
        <h2 className={styles.error}>
          Some required fields below are not filled in, please complete before
          submitting.
        </h2>
      )
    } else {
      data['subject'] = 'New message from Clear COVID Contact Form'
      data['site'] = 'Clear COVID'
      setErrorMessage('')
      setSubmitButtonText('Submitting...')
      axios
        .post(
          'https://p0hkpngww3.execute-api.us-east-1.amazonaws.com/submit',
          JSON.stringify(data),
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then(() => {
          setSuccessMessage(
            <h2 className={styles.success}>Feedback Submitted</h2>
          )
          setSubmitButtonText('Submit')
        })
        .catch(error =>
          setErrorMessage(
            'There was an error submitting your request, please check your network connection and try again.'
          )
        )
    }

    //
  }

  return (
    <Layout>
      <Helmet
        title={`Contact the Clear COVID team`}
        meta={[
          {
            name: 'description',
            content: `Clear COVID Contact Form`,
          },
        ]}
      />
      <header className={styles.header}>
        <h1>
          {
            queryResult.contactPageText.nodes.find(
              node => node.data.Section_Name === 'Header'
            ).data.Markdown
          }
        </h1>
      </header>

      <form
        className={styles.main}
        onSubmit={handleSubmit}
        aria-label="Contact Us"
      >
        <div className={styles.formRow}>
          <div
            className={styles.accessibility}
            dangerouslySetInnerHTML={{
              __html: unified()
                .use(markdown)
                .use(html)
                .processSync(
                  queryResult.contactPageText.nodes.find(
                    node => node.data.Section_Name === 'Accessibility Banner'
                  ).data.Markdown
                ),
            }}
          >
            {/* <p> */}
            {/*   If you have any accessibility issues using this site, please */}
            {/*   contact us directly at{' '} */}
            {/*   <a href="#">[Clear COVID Accessibility Address]</a>. */}
            {/* </p> */}
          </div>
          {console.log(queryResult)}
          <div
            dangerouslySetInnerHTML={{
              __html: unified()
                .use(markdown)
                .use(html)
                .processSync(
                  queryResult.contactPageText.nodes.find(
                    node => node.data.Section_Name === 'Header Paragraph'
                  ).data.Markdown
                ),
            }}
          />
          {/* <p> */}
          {/*   [PRIVACY POLICY] Lorem ipsum dolor sit amet, consectetur adipiscing */}
          {/*   elit, sed do eiusmod tempor incididunt ut labore et dolore magna */}
          {/*   aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco */}
          {/*   laboris nisi ut aliquip ex ea commodo consequat.( */}
          {/*   <a href="#">privacy policy</a>) */}
          {/* </p> */}
        </div>
        <div className={styles.formRow}>{errorMessage}</div>
        <div className={styles.formRow}>
          <label className={styles.firstName} htmlFor="First_Name">
            First Name*
            <input type="text" id="First_Name" name="First_Name" />
          </label>
          <label className={styles.lastName} htmlFor="Last_Name">
            Last Name*
            <input type="text" id="Last_Name" name="Last_Name" />
          </label>
        </div>

        <div className={styles.formRow}>
          <label className={styles.email} htmlFor="Email">
            Email*
            <input type="text" id="Email" name="Email" />
          </label>
          <label className={styles.org} htmlFor="Organization">
            Organization*
            <input type="text" id="Organization" name="Organization" />
          </label>
        </div>

        {/* <div className={styles.formRow}> */}
        {/*   <label className={styles.type} htmlFor="Type"> */}
        {/*     Topic* */}
        {/*     <select */}
        {/*       name="Type" */}
        {/*       onChange={e => { */}
        {/*         setType(e.target.value) */}
        {/*         console.log(e.target.value) */}
        {/*       }} */}
        {/*     > */}
        {/*       <option value="Comment">General comment</option> */}
        {/*       <option value="Feedback on the Guide"> */}
        {/*         Feedback on the Guide */}
        {/*       </option> */}
        {/*       <option value="Question">Submit question</option> */}
        {/*     </select> */}
        {/*   </label> */}
        {/*   <label */}
        {/*     className={styles.type} */}
        {/*     htmlFor="Type" */}
        {/*     style={ */}
        {/*       type === 'Question' */}
        {/*         ? { visibility: 'visible' } */}
        {/*         : { visibility: 'hidden' } */}
        {/*     } */}
        {/*   > */}
        {/*     Comment category* */}
        {/*     <select name="Category"> */}
        {/*       <option value="General">General</option> */}
        {/*       <option value="Medical Capacity">Medical Capacity</option> */}
        {/*       <option value="Logistics">Logistics / PPE Suppy Chain</option> */}
        {/*       <option value="Testing, Contact Tracing, Surveilance"> */}
        {/*         Disease Testing, Contact Tracing, & Surveilance */}
        {/*       </option> */}
        {/*       <option value="Modeling">Modeling</option> */}
        {/*       <option value="Vulnerable Populations, Low Resource Settings"> */}
        {/*         Vulnerable Populations, Low Resource Settings */}
        {/*       </option> */}
        {/*       <option value="Other">Other</option> */}
        {/*     </select> */}
        {/*   </label> */}
        {/* </div> */}

        <div className={styles.formRow}>
          <label className={styles.body} htmlFor="body">
            Comment or question*
            <textarea type="text" id="body" name="body" maxLength="1200" />
            <p>200 Words</p>
          </label>
        </div>
        <div className={styles.formRow}>
          <button className={styles.submit}>{submitButtonText}</button>
        </div>
        <div className={styles.formRow}>{successMessage}</div>
      </form>
    </Layout>
  )
}

export default Contact
