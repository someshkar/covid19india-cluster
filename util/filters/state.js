import hash from 'object-hash'
import { state_node } from '../../images'
import _ from 'lodash'
import dotProp from 'dot-prop-immutable'

export const addStates = (graph, patients) => {
  let states = {}

  for (let patientId in patients) {
    if (!states[hash(patients[patientId].state)]) {
      states[hash(patients[patientId].state)] = patients[patientId].state
    }
  }

  for (var key in states) {
    let node = {
      id: key,
      label: states[key],
      size: 40,
      shape: 'image',
      image: state_node,
      group: 'state'
    }
    graph = dotProp.set(graph, 'nodes', list => [...list, node])
  }

  for (let patientId in patients) {
    let edge = {
      from: hash(patients[patientId].state),
      to: patients[patientId].patientId,
      length: 250,
      dashes: true,
      arrows: {
        to: {
          enabled: false,
        },
      },
      color: { opacity: '0.3' },
    }
    graph = dotProp.set(graph, 'edges', list => [...list, edge])
  }

  return graph
}

export const removeStates = (graph, patients) => {
  let states = {}
  for (let patientId in patients) {
    if (!states[hash(patients[patientId].state)]) {
      states[hash(patients[patientId].state)] = patients[patientId].state
    }
  }
  for (var key in states) {
    let node = {
      id: key,
      label: states[key],
      size: 40,
      shape: 'image',
      image: state_node,
      group: 'state'
    }
    let index = _.findIndex(dotProp.get(graph, 'nodes'), function(o) {
      return o.id == node.id
    })

    if (index !== -1) {
      graph = dotProp.delete(graph, `nodes.${index}`)
    }
  }

  for (let patientId in patients) {
    let edge = {
      from: hash(patients[patientId].state),
      to: patients[patientId].patientId,
      length: 250,
      dashes: true,
      arrows: {
        to: {
          enabled: false,
        },
      },
      color: { opacity: '0.3' },
    }
    let edgeIndex = _.findIndex(graph.edges, function(o) {
      return o.to == edge.to && o.from === edge.from
    })

    graph = dotProp.delete(graph, `edges.${edgeIndex}`)
  }

  return graph
}
