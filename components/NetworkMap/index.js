import React, { useState, useEffect } from 'react'
import Graph from 'react-graph-vis'

import { rowsToGraph } from '../../util/parse'
import { connect } from 'react-redux'
import { updateGraph, updatePatients, selectPatient } from '../Redux/actions'
import normalize from '../../util/normalize'

// import dummyData from './dummyData.js'
// import dumpedRows from '../../dump'
// import jsonToGraph from '../../utils/parse'

const NetworkMap = ({ graph, updateGraph, updatePatients, selectPatient }) => {
  console.log('Graph :', graph)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/raw', {
      method: 'GET',
      redirect: 'follow',
    })
      .then(resp => resp.json())
      .then(res => {
        console.log(res)
        updateGraph(rowsToGraph(res.data.rawPatientData))
        updatePatients(normalize(res.data.rawPatientData))
        setIsLoading(false)
      })
      .catch(err => console.log('error', err))
  }, [])

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: '#000000',
    },
    height: '100%',
    width: '75%',
  }

  const events = {
    select: function(event) {
      var { nodes, edges } = event
      if (event.nodes[0]) {
        selectPatient(event.nodes[0])
      }
    },
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {isLoading ? null : (
        <Graph graph={graph} options={options} events={events} />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  let { graph } = state

  return { graph }
}

export default connect(mapStateToProps, {
  updateGraph,
  updatePatients,
  selectPatient,
})(NetworkMap)
