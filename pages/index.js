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
      `}</style>
    </div>
  )
}

export default Home
