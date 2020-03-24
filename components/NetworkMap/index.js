import React, { useState, useEffect, useRef } from 'react'
import Graph from 'react-graph-vis'

import { rowsToGraph } from '../../util/parse'
import { connect, useSelector } from 'react-redux'
import { updateGraph, updatePatients, selectPatient } from '../Redux/actions'
import normalize from '../../util/normalize'

const NetworkMap = ({
  graph,
  updateGraph,
  updatePatients,
  selectPatient,
  height,
  width,
}) => {

  const graphRef = useRef()
  const [isLoading, setIsLoading] = useState(true)
  const selected = useSelector(state => state.patient)

  useEffect(() => {
    fetch('https://api.rootnet.in/covid19-in/unofficial/covid19india.org', {
      cors: 'no-cors',
      method: 'GET',
      redirect: 'follow',
    })
      .then(resp => resp.json())
      .then(res => {
        updateGraph(rowsToGraph(res.data.rawPatientData))
        updatePatients(normalize(res.data.rawPatientData))
        setIsLoading(false)
      })
      .catch(err => console.log('error', err))
  }, [isLoading])

  useEffect(() => {
    // TODO: Figure out a way to make this do-able with patient Id search
    if (graphRef.current && selected.coords) { // Make sure the ref is ready
      const moveParams = {
        position: selected.coords,
        scale: 1.5,
        offset: { x:0, y:0 },
        animation: {
          duration: 500,
          easingFunction: 'easeInCubic'
        }
      }
      graphRef.current.Network.moveTo(moveParams)
    }
  }, [selected])

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: '#000000',
    },
    height: height,
    width: width,
  }

  const events = {
    select: function(event) {
      const selectedPatientId = event.nodes[0]
      if (selectedPatientId) {
        // As per the vis.js API, event.pointer.canvas points to the selected node within the canvas
        // which in our case is the patient. Inject this into the update logic.
        selectPatient({ id: selectedPatientId, coords: event.pointer.canvas })
      }
    },
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {isLoading ? null : (
        <Graph ref={graphRef} graph={graph} options={options} events={events} />
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
