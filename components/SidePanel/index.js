import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Header from './header'
import DataGrid from './datagrid'

const Container = styled.div`
  background-color: #fafafa;
  padding: 15px;
  overflow: auto;
`

const SidePanel = ({ patient, lastRefreshed }) => {

  return (
    <Container>
      {patient ? <Header patient={patient} lastRefreshed={lastRefreshed} /> : null}
      {patient ? <DataGrid {...patient} /> : null}
    </Container>
  )
}

const mapStateToProps = state => {
  const { patient, lastRefreshed } = state
  return { patient, lastRefreshed }
}

export default connect(mapStateToProps, null)(SidePanel)
