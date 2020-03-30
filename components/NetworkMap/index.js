import React, { useState, useEffect, useRef } from 'react'
import Graph from 'react-graph-vis'
import { connect, useSelector } from 'react-redux'
import {
  updateGraph,
  updatePatients,
  updateLastRefreshed,
  selectPatient,
  updateStates,
} from '../Redux/actions'

import DatePicker from '../DatePicker'
import NetworkMapLegend from './Legend'
import { useError, useLog, getAPIData, rowsToGraph, letterToCode, normalize } from '../../util'

const NetworkMap = ({
  filter,
  graph,
  updateGraph,
  updatePatients,
  updateLastRefreshed,
  updateStates,
  selectPatient,
  height,
  width,
  states,
}) => {
  const graphRef = useRef()
  const [isLoading, setIsLoading] = useState(true)
  const { selected, searchTerm } = useSelector(state => ({
    searchTerm: state.searchTerm,
    selected: state.patient,
  }))

  async function fetchStateWiseData() {
    const data = await getAPIData(
      'https://api.covid19india.org/state_district_wise.json')
    if (data) { 
      updateStates(Object.keys(data)) 
    }
  }

  async function fetchUnofficialData() {
    const data = await getAPIData(
      'https://api.rootnet.in/covid19-in/unofficial/covid19india.org')
    if (data) {
      const _rawPatientData = data.rawPatientData
      updateGraph(rowsToGraph(_rawPatientData))
      updatePatients(normalize(_rawPatientData))
      updateLastRefreshed(data.lastRefreshed)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!states) {
      try {
        fetchStateWiseData()
      } catch (error) {
        useError(error)
      }
    }
  })

  useEffect(() => {
    if (!states) {
      try {
        fetchUnofficialData()
      } catch (error) {
        useError(error)
      }
    }
  }, [isLoading])

  useEffect(() => {
    // TODO: Figure out a way to make this do-able with patient Id search
    if (graphRef.current && selected.coords) {
      // Make sure the ref is ready
      const moveParams = {
        position: selected.coords,
        scale: 1.5,
        offset: { x: 0, y: 0 },
        animation: {
          duration: 500,
          easingFunction: 'easeInCubic',
        },
      }
      graphRef.current.Network.moveTo(moveParams)
    }
  }, [selected])

  useEffect(() => {
    // TODO: Add search by age, district, etc.
    if (graphRef.current && searchTerm) {
      // Make sure the ref is ready
      try {
        const nodeKey = letterToCode(`P${searchTerm}`)
        const coordsMap = graphRef.current.Network.getPositions([nodeKey])
        graphRef.current.Network.selectNodes([nodeKey])
        selectPatient({ id: nodeKey, coords: coordsMap[nodeKey] })
      } catch (e) {
        // None found. TODO: Add a UI response
        useError(e)
      }
    }
  }, [searchTerm])

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: '#000000',
    },
    nodes: {
      chosen: {
        node: (values, id, selected, hovering) => {
          values.color = selected ? '#000' : 'green'
        },
      },
    },
    height: height,
    width: width,
    interaction: {
      navigationButtons: true,
    },
  }

  const events = {
    select: function(event) {
      const selectedNodeId = event.nodes[0]
      const selectedNode = graph.nodes.find(v => v.id === selectedNodeId)
      if (selectedNode) {
        switch (selectedNode.group) {
          case 'patient':
            // As per the vis.js API, event.pointer.canvas points to the selected node within the canvas
            // which in our case is the patient. Inject this into the update logic.
            selectPatient({ id: selectedNode.id, coords: event.pointer.canvas })
            break
          case 'city':
          default:
        }
      }
    },
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {isLoading ? null : (
        <>
          <NetworkMapLegend currentFilter={filter} />
          <Graph
            ref={graphRef}
            graph={graph}
            options={options}
            events={events}
          />
          <DatePicker />
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  let { graph, searchTerm, filter, states } = state
  return { graph, searchTerm, filter, states }
}

export default connect(mapStateToProps, {
  updateGraph,
  updatePatients,
  updateStates,
  updateLastRefreshed,
  selectPatient,
})(NetworkMap)
