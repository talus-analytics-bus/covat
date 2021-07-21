import React from 'react'
import PropTypes from 'prop-types'

// triggering build with comment

export default function HTML(props) {
  React.useEffect(() => {}, [])
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <script
          src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
          data-cfasync="false"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          /**
           * If consent is given for cookies, add gtag cookies
           * @method setupGA
           * @return {[type]} [description]
           */
          function setupGA(allowed) {
            if (!allowed) {
              document.cookie = 'gatsby-plugin-google-analytics-gdpr_cookies-enabled=false'
            } else {
              document.cookie = 'gatsby-plugin-google-analytics-gdpr_cookies-enabled=true'
            }
          }
          window.cookieconsent.initialise({
            palette: {
              popup: {
                background: "#d4d4d4"
              },
              button: {
                background: "#0f234b"
              }
            },
            position: "bottom-right",
            type: "opt-in",
            content: {
              message:
                "COVAT uses cookies to ensure you get the best experience possible."
            },
            onInitialise: function(status) {
              var type = this.options.type;
              var didConsent = this.hasConsented();
              if (type == "opt-in" && didConsent) {
                // enable cookies
                setupGA(true);
              }
              if (type == "opt-out" && !didConsent) {
                // disable cookies
                setupGA(false);
              }
            },
            onStatusChange: function(status, chosenBefore) {
              var type = this.options.type;
              var didConsent = this.hasConsented();
              if (type == "opt-in" && didConsent) {
                // enable cookies
                setupGA(true);
              }
              if (type == "opt-out" && !didConsent) {
                // disable cookies
                setupGA(false);
              }
            },
            onRevokeChoice: function() {
              var type = this.options.type;
              if (type == "opt-in") {
                // disable cookies
                setupGA(false);
              }
              if (type == "opt-out") {
                // enable cookies
                setupGA(true);
              }
            }
          });`,
          }}
        ></script>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
