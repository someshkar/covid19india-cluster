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

const SidePanel = ({ patient, lastRefreshed, totalCount }) => {

  return (
    <Container>
      {patient ? <Header patient={patient} lastRefreshed={lastRefreshed} totalCount={totalCount} /> : null}
      {patient ? <DataGrid {...patient} /> : null}
    </Container>
  )
}

const mapStateToProps = state => {
  const { patient, lastRefreshed, totalCount } = state
  return { patient, lastRefreshed, totalCount }
}

export default connect(mapStateToProps, null)(SidePanel)
