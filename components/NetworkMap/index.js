import React, { useState, useEffect } from 'react'
import Graph from 'react-graph-vis'

import { rowsToGraph } from '../../util/parse'

// import dummyData from './dummyData.js'
// import dumpedRows from '../../dump'
// import jsonToGraph from '../../utils/parse'

const NetworkMap = () => {
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
    width: '70%',
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
