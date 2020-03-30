import Head from 'next/head'

import Navbar from './navbar'

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>COVID 19 Delhi</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default Layout
