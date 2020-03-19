import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'

const Text = styled.div`
  font-size: 50px;
`

const SidePanel = ({ patient }) => {
  console.log('Sidepanel', patient)
  return (
    <div style={{ backgroundColor: 'red' }}>
      <Text>{patient ? patient.patientId : 'hello'}</Text>
    </div>
  )
}

const mapStateToProps = state => {
  let { patients } = state
  let { selected } = state
  let selectedPatient = selected ? selected : 251
  let patient = patients ? patients.byId[selectedPatient] : null

  return { patient }
}

export default connect(mapStateToProps, null)(SidePanel)
