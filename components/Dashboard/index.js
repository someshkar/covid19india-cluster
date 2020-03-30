import React from 'react'
import styled from 'styled-components'
import NoSSR from 'react-no-ssr'
import {
  BrowserView,
  MobileView,
  isMobile,
  isBrowser,
} from 'react-device-detect'

import NetworkMap from '../NetworkMap'
import SidePanel from '../SidePanel'
import FilterPanel from '../FilterPanel'
import { Provider } from 'react-redux'
import { store } from '../Redux/store'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 5% 25% 70%;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 50% 10% 40%;
  }
`

const Dashboard = () => {
  return (
    <Provider store={store}>
      <Container>
        {isMobile && (
          <NoSSR>
            <NetworkMap
              height={isMobile ? '50%' : '100%'}
              width={isMobile ? '100%' : '70%'}
            />
          </NoSSR>
        )}
        <FilterPanel />
        <SidePanel />
        {isBrowser && (
          <NoSSR>
            <NetworkMap
              height={isMobile ? '50%' : '100%'}
              width={isMobile ? '100%' : '70%'}
            />
          </NoSSR>
        )}
      </Container>
    </Provider>
  )
}

export default Dashboard
