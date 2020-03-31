import React, { useState, useEffect, useRef, useMemo } from 'react'
import Graph from 'react-graph-vis'
import { Tooltip, TooltipArrow, TooltipInner } from 'styled-tooltip-component'
import { connect, useSelector } from 'react-redux'
import { updateGraph, updatePatients, updateLastRefreshed, selectPatient, updateStates, updateSidePanelPatient, updateLegendFilter } from '../Redux/actions'

import { rowsToGraph, letterToCode } from '../../util/parse'
import normalize from '../../util/normalize'
import DatePicker from '../DatePicker'
import NetworkMapLegend from '../NetworkMapLegend'

const NetworkMap = ({
  graph,
  updateGraph,
  updatePatients,
  updateLastRefreshed,
  updateStates,
  selectPatient,
  height,
  width,
  states
}) => {
  const graphRef = useRef()
  const [isLoading, setIsLoading] = useState(true)
  const [graphData, setGraphData] = useState({
    nodes: [],
    edges: []
  })
  const [toolTipPosition, setToolTipPosition] = useState(null)
  const [tooltipContent, setToolTipContent] = useState('')
  const toolTipVisible = useMemo(() => {
    return toolTipPosition !== null
  }, [toolTipPosition])
  const { selected, searchTerm } = useSelector(state => ({
    searchTerm: state.searchTerm,
    selected: state.patient,
  }))
  useEffect(() => {
    if (!states) {
      fetch('https://api.covid19india.org/state_district_wise.json', {
        cors: 'no-cors',
        method: 'GET',
        redirect: 'follow',
      })
        .then(resp => resp.json())
        .then(res => {
          if (res) {
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
          easingFunction: 'easeInCubic',
        },
      }
      graphRef.current.Network.moveTo(moveParams)
    }
  }, [selected])

  // This effect handles zoom behaviour when search term is changed
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
      }
    }
  }, [searchTerm])


  useEffect(() => {
    // setGraphData(graph)
    if (graphRef.current) {
      graphRef.current.Network.setData(graph)
    }
  }, [graph])

  const options = {
    layout: {
      hierarchical: false,
      clusterThreshold: 1300
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
      hover: true,
    },
    physics: {
      solver: 'forceAtlas2Based',
      forceAtlas2Based: {
        avoidOverlap: 1
      }
      // stabilization: true,
      // barnesHut: {
      //   // gravitationalConstant: -80000,
      //   springConstant: 0.001,
      //   springLength: 200
      // }
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
    hoverNode: function (e) {
      const { node, event } = e
      const selectedNode = graph.nodes.find(v => v.id === node)
      setToolTipContent(selectedNode.label)
      setToolTipPosition({
        top: event.pageY,
        left: event.pageX,
      })
    },
    blurNode: function (event) {
      setToolTipContent('')
      setToolTipPosition(null)
    },
    // stabilizationProgress: function (e) {
    //   document.getElementById('graph-loader').style.display = 'block'
    // },
    // stabilizationIterationsDone: function (e) {
    //   document.getElementById('graph-loader').style.display = 'none'
    // }

  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {isLoading ? null : (
        <>
          {/* <div id="graph-loader" style={{ display: 'none', position: 'absolute', top: '50%', left: '50%', height: '100%', width: '100%', backgroundColor: 'white' }}>
            Loading....
          </div> */}
          <NetworkMapLegend />
          <Graph
            ref={graphRef}
            graph={graphData}
            options={options}
            events={events}
          />
          <DatePicker />
          {toolTipVisible && (
            <Tooltip
              hidden={!toolTipVisible}
              style={{
                top: `${(toolTipPosition && toolTipPosition.top) || 0}px`,
                left: `${(toolTipPosition && toolTipPosition.left) || 0}px`,
              }}
            >
              <TooltipArrow />
              <TooltipInner>{tooltipContent}</TooltipInner>
            </Tooltip>
          )}
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  let { graph, searchTerm, states } = state
  return { graph, searchTerm, states }
}

export default connect(mapStateToProps, {
  updateGraph,
  updatePatients,
  updateStates,
  updateLastRefreshed,
  selectPatient,
})(NetworkMap)
