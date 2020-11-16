module.exports = {
  siteMetadata: {
    title: `COVAT`,
    description: `Information and media from leading COVID Vaccine experts.`,
    author: `Talus Analytics`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en',
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     // The property ID; the tracking code won't be generated without it
    //     trackingId: 'UA-179245880-1',
    //     // Defines where to place the tracking script - `true` in the head and `false` in the body
    //     head: false,
    //     // Setting this parameter is optional
    //     anonymize: true,
    //     // Defers execution of google analytics script after page load
    //     defer: true,
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics-gdpr`,
      options: {
        // The property ID; the tracking code won't be generated without it.
        trackingId: 'UA-179245880-1',
        // Optional parameter (default false) - Enable analytics in development mode.
        enableDevelopment: true, // default false
        // Optional parameter (default true) - Some countries (such as Germany) require you to use the _anonymizeIP function for Google Analytics. Otherwise you are not allowed to use it.
        anonymizeIP: true,
        // Optional parameter (default false) - Starts google analytics with cookies enabled. In some countries (such as Germany) this is not allowed.
        autoStartWithCookiesEnabled: false,
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY, // may instead specify via env, see below
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: [
          {
            baseId: `appMbNcOXaqDud7ts`,
            tableName: `Home Page Text`,
          },
          {
            baseId: `appMbNcOXaqDud7ts`,
            tableName: `About Page Text`,
            tableView: `Grid view`,
          },
          {
            baseId: `appMbNcOXaqDud7ts`,
            tableName: `Experts Page Text`,
            tableView: `Last Name Alphabetized`,
          },
          {
            baseId: `appMbNcOXaqDud7ts`,
            tableName: `Resources Page Text`,
          },
          {
            baseId: `appMbNcOXaqDud7ts`,
            tableName: `Resources`,
            tableView: `Grid view`,
          },
          {
            baseId: `appMbNcOXaqDud7ts`,
            tableName: `Contact Page Text`,
          },
          {
            baseId: `appMbNcOXaqDud7ts`,
            tableName: `Blog`,
            defaultValues: {
              Additional_Images: [{ filename: '', url: '' }],
            },
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
