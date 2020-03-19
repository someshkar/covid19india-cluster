import React from 'react'
import styled from 'styled-components'
import NetworkMap from '../NetworkMap'
import SidePanel from '../SidePanel'
import { Provider } from 'react-redux'
import { store } from '../Redux/store'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 5% 25% 70%;
`

const Dashboard = () => {
  return (
    <Provider store={store}>
      <Container>
        <div />
        <SidePanel />
        <NetworkMap />
      </Container>
    </Provider>
  )
}

export default Dashboard
