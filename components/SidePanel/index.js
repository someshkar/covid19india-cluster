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

const SidePanel = ({ patient,updatedDate }) => {

  return (
    <Container>
      {patient ? <Header patient={patient} updatedDate={updatedDate} /> : null}
      {patient ? <DataGrid {...patient} /> : null}
    </Container>
  )
}

const mapStateToProps = state => {
  const { patient,updatedDate} = state
  return { patient,updatedDate }
}

export default connect(mapStateToProps, null)(SidePanel)
