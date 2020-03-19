import Head from 'next/head'
import NoSSR from 'react-no-ssr'

import NetworkMap from '../components/NetworkMap'
import SidePanel from '../components/SidePanel'

const Home = () => (
  <div className="container">
    <Head>
      <title>COVID 19 India Network</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      {/* <div>COVID 19 India Network Map</div> */}
      <div className="sidebar"></div>
      {/* <div className="panel"></div> */}
      <SidePanel />
      <NoSSR>
        <NetworkMap />
      </NoSSR>
    </main>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        overflow: hidden;
      }

      * {
        box-sizing: border-box;
      }

      main {
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-columns: 5% 25% 70%;
      }

      .sidebar {
        background: green;
      }

      .panel {
        background: red;
      }
    `}</style>
  </div>
)

export default Home
