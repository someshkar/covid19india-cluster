import Document, { Head, Main, NextScript } from 'next/document'
// Import styled components ServerStyleSheet
import GitHubForkRibbon from 'react-github-fork-ribbon'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet()

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement()

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          {/* Step 5: Output the styles in the head  */}
          <link
            href="https://fonts.googleapis.com/css?family=Lato&display=swap"
            rel="stylesheet"
          />
          {this.props.styleTags}
        </Head>
        <body>
          <GitHubForkRibbon
            position="right"
            color="green"
            href="https://github.com/someshkar/covid19india-cluster"
            target="_blank"
          >
            Fork me on GitHub
          </GitHubForkRibbon>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
