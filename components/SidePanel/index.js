import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Header from './header'
import DataGrid from './datagrid'

const SidePanel = ({ patient, lastRefreshed, hideSidePanel }) => {
  const Container = styled.div`
    background-color: #fafafa;
    padding: 15px;
    overflow: auto;
    display: ${hideSidePanel ? 'none' : 'block'};
  `

  return (
    <Container>
      {patient ? (
        <Header patient={patient} lastRefreshed={lastRefreshed} />
      ) : null}
      {patient ? <DataGrid {...patient} /> : null}
    </Container>
  )
}

const mapStateToProps = state => {
  const { patient, lastRefreshed } = state
  return { patient, lastRefreshed }
}

export default connect(mapStateToProps, null)(SidePanel)
