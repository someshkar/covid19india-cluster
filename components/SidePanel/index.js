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

const SidePanel = ({ patient }) => {

  return (
    <Container>
      {patient ? <Header patient={patient} /> : null}
      {patient ? <DataGrid {...patient} /> : null}
    </Container>
  )
}

const mapStateToProps = state => {
  const { patient } = state
  return { patient }
}

export default connect(mapStateToProps, null)(SidePanel)
