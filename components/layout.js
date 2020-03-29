import Head from 'next/head'

import Navbar from './navbar'

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>COVID 19 Delhi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default Layout
