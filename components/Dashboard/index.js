import React from 'react'
import styled from 'styled-components'
import NetworkMap from '../NetworkMap'
import SidePanel from '../SidePanel'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 5% 25% 70%;
`

const Dashboard = () => {
  return (
    <Container>
      <div />
      <SidePanel />
      <NetworkMap />
    </Container>
  )
}

export default Dashboard
