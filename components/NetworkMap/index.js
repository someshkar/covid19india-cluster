import React, { useState, useEffect } from 'react'
import Graph from 'react-graph-vis'

import { rowsToGraph } from '../../util/parse'

// import dummyData from './dummyData.js'
// import dumpedRows from '../../dump'
// import jsonToGraph from '../../utils/parse'

const NetworkMap = () => {
  // const testGraph = {
  //   nodes: [
  //     {
  //       id: 1,
  //       label: 'Node 1',
  //       title: 'node 1 tootip text',
  //       shape: 'circularImage',
  //       image: 'https://avatars2.githubusercontent.com/u/14039437?v=4',
  //     },
  //     { id: 2, label: 'Node 2', title: 'node 2 tootip text' },
  //     { id: 3, label: 'Node 3', title: 'node 3 tootip text' },
  //     { id: 4, label: 'Node 4', title: 'node 4 tootip text' },
  //     { id: 5, label: 'Node 5', title: 'node 5 tootip text' },
  //     { id: 6, label: 'Node 6', title: 'node 6 tootip text' },
  //   ],
  //   edges: [
  //     { from: 1, to: 2 },
  //     { from: 1, to: 3 },
  //     { from: 2, to: 4 },
  //     { from: 2, to: 5 },
  //   ],
  // }

  // const graph = jsonToGraph(dumpedRows)

  const [isLoading, setIsLoading] = useState(true)
  const [graph, setGraph] = useState({ nodes: [], edges: [] })

  useEffect(() => {
    fetch('/api/raw', {
      method: 'GET',
      redirect: 'follow',
    })
      .then(resp => resp.json())
      .then(res => {
        console.log(res)
        setGraph(rowsToGraph(res.data.rawPatientData))
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
    width: '100%',
  }

  const events = {
    select: function(event) {
      var { nodes, edges } = event
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

export default NetworkMap
