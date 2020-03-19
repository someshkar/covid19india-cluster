import hash from 'object-hash'

export function addStates(graph, rows) {
  let states = {}
  rows.forEach(row => {
    if (!states[hash(row.state)]) {
      states[hash(row.state)] = row.state
    }
  })

  for (var key in states) {
    let node = {
      id: key,
      label: states[key],
      size: 40,
      shape: 'image',
      image: state,
    }
    graph.nodes.push(node)
  }

  rows.forEach(row => {
    let edge = {
      from: hash(row.state),
      to: letterToCode(row.patientId),
      length: 250,
      dashes: true,
      arrows: {
        to: {
          enabled: false,
        },
      },
      color: { opacity: '0.3' },
    }
    graph.edges.push(edge)
  })

  return graph
}
