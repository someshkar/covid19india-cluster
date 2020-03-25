import { useEffect } from 'react'
import Head from 'next/head'

import { initGA, logPageView } from '../util/googleAnalytics'

import Dashboard from '../components/Dashboard'

const Home = () => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [])

  return (
    <div className="container">
      <Head>
        <title>COVID 19 India Network</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Dashboard />
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          overflow: hidden;
        }

        * {
          box-sizing: border-box;
        }

        main {
          height: 100vh;
          width: 100vw;
          display: grid;
          /* grid-template-columns: 5% 25% 70%; */
        }

        .sidebar {
          background: green;
        }

        .panel {
          background: red;
        }

        @media screen and (max-width: 768px) {
          html,
          body {
            overflow: auto;
          }
        }
        div.vis-navigation {
          position: absolute;
          bottom: 5px;
          left: 10px;
        }
        div.vis-network div.vis-navigation div.vis-button.vis-up,
        div.vis-network div.vis-navigation div.vis-button.vis-down,
        div.vis-network div.vis-navigation div.vis-button.vis-left,
        div.vis-network div.vis-navigation div.vis-button.vis-right,
        div.vis-network div.vis-navigation div.vis-button.vis-zoomIn,
        div.vis-network div.vis-navigation div.vis-button.vis-zoomOut,
        div.vis-network div.vis-navigation div.vis-button.vis-zoomExtends {
          background-image: none !important;
          display: inline-block;
        }

        div.vis-network div.vis-navigation div.vis-button.vis-zoomIn,
        div.vis-network div.vis-navigation div.vis-button.vis-zoomOut,
        div.vis-network div.vis-navigation div.vis-button.vis-zoomExtends {
          margin-right: 10px;
        }

        div.vis-network div.vis-navigation div.vis-button:hover {
          box-shadow: none !important;
        }

        .vis-button:after {
          font-size: 1.8em;
          color: gray;
        }

        .vis-button:hover:after {
          font-size: 1.8em;
          color: lightgray;
        }

        .vis-button.vis-zoomIn:after {
          content: '+';
          font-weight: bold;
        }

        .vis-button.vis-zoomOut:after {
          content: '−';
          font-weight: bold;
        }

        .vis-button.vis-zoomExtends:after {
          content: '⤧';
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

export default Home
