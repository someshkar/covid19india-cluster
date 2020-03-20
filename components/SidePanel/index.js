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
// const SidePanel = ({ patient }) => {
//   console.log('Sidepanel', patient)
//   return (
//     <div style={{ backgroundColor: 'red' }}>
//       <Text>{patient ? patient.patientId : 'hello'}</Text>
//     </div>
//   )
// }

const mapStateToProps = state => {
  let { patients } = state
  let { selected } = state
  let selectedPatient = selected ? selected : 251
  let patient = patients ? patients.byId[selectedPatient] : null

  return { patient }
}

export default connect(mapStateToProps, null)(SidePanel)
