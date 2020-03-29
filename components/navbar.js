import React, { useState } from 'react'
import Link from 'next/link'

function Navbar(props) {
  const [view, setView] = useState('Home')

  // HTML Properties for each of the links in UI
  const navLinkProps = (path, animationDelay) => ({
    className: `fadeInUp ${window.location.pathname === path ? 'focused' : ''}`,
    style: {
      animationDelay: `${animationDelay}s`,
    },
  })
  if (typeof window !== `undefined`) {
    return (
      <div
        className="Navbar"
        style={{
          animationDelay: '0.5s',
          height: view === 'Clusters' ? '2.5rem' : '',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <img
          className="fadeInUp logo"
          alt="India COVID-19 Tracker"
          src="/icon.png"
          style={{
            animationDelay: '0.0s',
            width: view === 'Clusters' ? '1.5rem' : '',
            height: view === 'Clusters' ? '1.5rem' : '',
            transition: 'all 0.3s ease-in-out',
          }}
        />

        <div className="navbar-left">
          <Link
            href="/"
            onClick={() => {
              setView('Home')
            }}
          >
            <span {...navLinkProps('/', 0.2)}>Home</span>
          </Link>

          {/* <Link to="/updates" onClick={()=>{
            setView('Updates');
          }}>
            <span className={`fadeInUp ${view==='Updates' ? 'focused' : ''}`} style={{animationDelay: '0.2s'}}>Updates</span>
          </Link>*/}

          <Link
            href="/cluster"
            onClick={() => {
              setView('Clusters')
            }}
          >
            <span {...navLinkProps('/clusters', 0.3)}>Cluster</span>
          </Link>

          <Link
            href="/links"
            onClick={() => {
              setView('Helpful Links')
            }}
          >
            <span {...navLinkProps('/links', 0.4)}>Helpful Links</span>
          </Link>

          <Link
            href="/faq"
            onClick={() => {
              setView('FAQs')
            }}
          >
            <span {...navLinkProps('/faq', 0.4)}>FAQ</span>
          </Link>
        </div>

        <div className="navbar-right"></div>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default Navbar
