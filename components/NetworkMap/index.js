import React, { useState, useEffect, useRef } from 'react'
import Graph from 'react-graph-vis'
import { connect, useSelector } from 'react-redux'
import { updateGraph, updatePatients, updateLastRefreshed, selectPatient } from '../Redux/actions'

import { rowsToGraph, letterToCode } from '../../util/parse'
import normalize from '../../util/normalize'
import DatePicker from '../DatePicker'
import NetworkMapLegend from '../NetworkMapLegend'

const NetworkMap = ({
  filter,
  graph,
  updateGraph,
  updatePatients,
  updateLastRefreshed,
  selectPatient,
  height,
  width,
  legendFilter
}) => {

  const graphRef = useRef()
  const [isLoading, setIsLoading] = useState(true)
  const { selected, searchTerm } = useSelector(state => ({
    searchTerm: state.searchTerm,
    selected: state.patient
  }))
  const [rawResponseData, setRawResponseData] = useState(null)

  useEffect(() => {
    fetch('https://api.rootnet.in/covid19-in/unofficial/covid19india.org', {
      cors: 'no-cors',
      method: 'GET',
      redirect: 'follow',
    })
      .then(resp => resp.json())
      .then(res => {
        setRawResponseData(res.data.rawPatientData)
        updateGraph(rowsToGraph(res.data.rawPatientData))
        updatePatients(normalize(res.data.rawPatientData))
        updateLastRefreshed(res.data.lastRefreshed)
        setIsLoading(false)
      })
      .catch(err => console.log('error', err))
  }, [isLoading])

  // This effect handles zoom behaviour when a patient node is clicked
  useEffect(() => {
    // TODO: Figure out a way to make this do-able with patient Id search
    if (graphRef.current && selected && selected.coords) { // Make sure the ref is ready
      const moveParams = {
        position: selected.coords,
        scale: 1.5,
        offset: { x: 0, y: 0 },
        animation: {
          duration: 500,
          easingFunction: 'easeInCubic'
        }
      }
      graphRef.current.Network.moveTo(moveParams)
    }
  }, [selected])

  // This effect handles zoom behaviour when search term is changed
  useEffect(() => {
    // TODO: Add search by age, district, etc.
    if (graphRef.current && searchTerm) { // Make sure the ref is ready
      try {
        const nodeKey = letterToCode(`P${searchTerm}`)
        const coordsMap = graphRef.current.Network.getPositions([nodeKey])
        graphRef.current.Network.selectNodes([nodeKey])
        console.log("SELECT PATIENT IN SEARCH TERM EFFECT")
        selectPatient({ id: nodeKey, coords: coordsMap[nodeKey] })
      } catch (e) {
        // None found. TODO: Add a UI response
      }
    }
  }, [searchTerm])


  // THis effect handles filtering when a legend item is clicked
  useEffect(() => {
    console.log('legend filter in neterok map component: ', legendFilter)
    if (graph) {
      console.log('CURRENT GRAPH: ', graph)
      let filteredResult = rawResponseData.filter(item => item.status === legendFilter)
      updateGraph(rowsToGraph(filteredResult))
      updatePatients(normalize(filteredResult))
      console.log('FILTERED RESULT: ', filteredResult)
      console.log('patientID: ', filteredResult[0].patientId)
      // const nodeKey = letterToCode(`P${filteredResult[0].patientId}`)
      // const coordsMap = graphRef.current.Network.getPositions([nodeKey])
      // graphRef.current.Network.selectNodes([nodeKey])
      // selectPatient({ id: nodeKey, coords: coordsMap[nodeKey] })
    }
  }, [legendFilter])

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
        }
      }
    },
    height: height,
    width: width,
    interaction: {
      navigationButtons: true,
    },
  }

  const events = {
    select: function (event) {
      const selectedNodeId = event.nodes[0]
      const selectedNode = graph.nodes.find(v => v.id === selectedNodeId)
      if (selectedNode) {
        switch (selectedNode.group) {
          case 'patient':
            // As per the vis.js API, event.pointer.canvas points to the selected node within the canvas
            // which in our case is the patient. Inject this into the update logic.
        console.log("SELECT PATIENT IN SELECT EVENT")
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
          <NetworkMapLegend currentGlobalFilter={filter} />
          <div style={{ position: 'absolute', left: '50%', fontWeight: 'bold' }}>{legendFilter}</div>
          <Graph ref={graphRef} graph={graph} options={options} events={events} />
          <DatePicker />
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  let { graph, searchTerm, filter, legendFilter } = state
  return { graph, searchTerm, filter, legendFilter }
}

export default connect(mapStateToProps, {
  updateGraph,
  updatePatients,
  updateLastRefreshed,
  selectPatient,
})(NetworkMap)
