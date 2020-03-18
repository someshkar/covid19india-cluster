import Head from 'next/head'
import NoSSR from 'react-no-ssr'

import NetworkMap from '../components/NetworkMap'

const Home = () => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      {/* <div>COVID 19 India Network Map</div> */}
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
      }

      * {
        box-sizing: border-box;
      }

      main {
        height: 100vh;
        width: 100vw;
      }
    `}</style>
  </div>
)

export default Home
