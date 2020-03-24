import React from 'react'
import styled from 'styled-components'

import Header from './header'
import DataGrid from './datagrid'

import { connect } from 'react-redux'

const Container = styled.div`
  background-color: #fafafa;
  padding: 15px;
  overflow: auto;
`

const SidePanel = ({ patient }) => {
  return (
    <Container>
      {patient ? <Header {...patient} /> : null}
      {patient ? <DataGrid {...patient} /> : null}
    </Container>
  )
}

const mapStateToProps = state => {
  const { patient } = state
  return { patient }
}

export default connect(mapStateToProps, null)(SidePanel)
