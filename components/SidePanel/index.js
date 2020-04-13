import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Header from './header'
import DataGrid from './datagrid'
import ExtendedFilter from './extendedfilter'
const Container = styled.div`
  background-color: #fafafa;
  padding: 15px;
  overflow: auto;
`

const SidePanel = ({ patient, lastRefreshed, patients, filter }) => {

  return (
    <Container>
      {(filter=='State' || filter=='City' )? <ExtendedFilter></ExtendedFilter>: null}
      {patient ? <Header patient={patient} lastRefreshed={lastRefreshed} patients={patients} /> : null}
      {patient ? <DataGrid {...patient} /> : null}
    </Container>
  )
}

const mapStateToProps = state => {
  const { patient, lastRefreshed, patients, filter } = state
  return { patient, lastRefreshed, patients, filter }
}

export default connect(mapStateToProps, null)(SidePanel)
