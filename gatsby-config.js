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
            tableName: `Resources Page Text`,
          },
          {
            baseId: `appMbNcOXaqDud7ts`,
            tableName: `Contact Page Text`,
          },
          {
            baseId: `appMbNcOXaqDud7ts`,
            tableName: `Resources`,
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
