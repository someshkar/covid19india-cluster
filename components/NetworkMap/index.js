import React, { useState, useEffect, useRef } from 'react'
import Graph from 'react-graph-vis'
import { connect, useSelector } from 'react-redux'
import { updateGraph, updatePatients, updateLastRefreshed, selectPatient,
   updateStates,setSelectedLegend ,updateRawData
  } from '../Redux/actions'

import { rowsToGraph, letterToCode } from '../../util/parse'
import normalize from '../../util/normalize'
import DatePicker from '../DatePicker'
import NetworkMapLegend from '../NetworkMapLegend'

const NetworkMap = ({
  filter,
  updateGraph,
  updatePatients,
  updateLastRefreshed,
  updateStates,
  selectPatient,
  setSelectedLegend,
  updateRawData,
  height,
  width,
  states
}) => {

  const graphRef = useRef()
  const [isLoading, setIsLoading] = useState(true)
  const { selected, searchTerm , graph } = useSelector(state => {
    const updatedGraph = rowsToGraph(state.rawData,state.legendType)
    return {
    searchTerm: state.searchTerm,
    selected: state.patient,
    graph : updatedGraph
  }})

  useEffect(() => {
    if(!states){
      fetch('https://api.covid19india.org/state_district_wise.json', {
        cors: 'no-cors',
        method: 'GET',
        redirect: 'follow',
      })
        .then(resp => resp.json())
        .then(res => {
          if(res){
            let stateNames = Object.keys(res);
            updateStates(stateNames);
          }
        })
    }
  })

  useEffect(() => {
    fetch('https://api.rootnet.in/covid19-in/unofficial/covid19india.org', {
      cors: 'no-cors',
      method: 'GET',
      redirect: 'follow',
    })
      .then(resp => resp.json())
      .then(res => {
        updateRawData(res.data.rawPatientData)
        // updateGraph(rowsToGraph(res.data.rawPatientData))
        updatePatients(normalize(res.data.rawPatientData))
        updateLastRefreshed(res.data.lastRefreshed)
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
        offset: { x: 0, y: 0 },
        animation: {
          duration: 500,
          easingFunction: 'easeInCubic'
        }
      }
      graphRef.current.Network.moveTo(moveParams)
    }
  }, [selected])

  useEffect(() => {
    // TODO: Add search by age, district, etc.
    if (graphRef.current && searchTerm) { // Make sure the ref is ready
      try {
        const nodeKey = letterToCode(`P${searchTerm}`)
        const coordsMap = graphRef.current.Network.getPositions([nodeKey])
        graphRef.current.Network.selectNodes([nodeKey])
        selectPatient({ id: nodeKey, coords: coordsMap[nodeKey] })
      } catch (e) {
        // None found. TODO: Add a UI response
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
          <NetworkMapLegend currentFilter={filter} filterGraph={ (id)=>setSelectedLegend(id)}/>
          <Graph ref={graphRef} graph={graph} options={options} events={events} />
          <DatePicker />
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  let {  searchTerm, filter, states  } = state
  return { searchTerm, filter, states}
}

export default connect(mapStateToProps, {
  updateGraph,
  updatePatients,
  updateRawData,
  updateStates,
  updateLastRefreshed,
  selectPatient,
  setSelectedLegend
})(NetworkMap)
