import hash from 'object-hash'
import _ from 'lodash'
import dotProp from 'dot-prop-immutable'

import { plane_node } from '../../images'

export const addTravel = (graph, patients) => {
  let locations = {}

  for (let patientId in patients) {
    if (patients[patientId].travel !== null) {
      patients[patientId].travel.forEach(loc => {
        if (!locations[hash(loc)]) {
          locations[hash(loc)] = loc
        }
      })
    }
  }

  console.log(locations)

  for (let loc in locations) {
    let node = {
      id: loc,
      label: locations[loc],
      size: 30,
      shape: 'image',
      image: plane_node,
    }
    graph = dotProp.set(graph, 'nodes', list => [...list, node])
  }

  // Add edges from patient to location
  for (let patientId in patients) {
    if (patients[patientId].travel !== null && patients[patientId].travel[0]) {
      patients[patientId].travel.forEach(loc => {
        let edge = {
          from: hash(loc),
          to: patients[patientId].patientId,
          length: 500,
          dashes: true,
          arrows: {
            to: {
              enabled: false,
            },
          },
          color: { opacity: '0.2' },
        }

        graph = dotProp.set(graph, 'edges', list => [...list, edge])
      })
    }
  }

  return graph
}

export const removeTravel = (graph, patients) => {
  let locations = {}

  for (let patientId in patients) {
    if (patients[patientId].travel !== null) {
      patients[patientId].travel.forEach(loc => {
        if (!locations[hash(loc)]) {
          locations[hash(loc)] = loc
        }
      })
    }
  }

  for (let loc in locations) {
    let node = {
      id: loc,
      label: locations[loc],
      size: 30,
      shape: 'image',
      image: plane_node,
    }
    let index = _.findIndex(dotProp.get(graph, 'nodes'), function(o) {
      return o.id == node.id
    })
    if (index !== -1) {
      graph = dotProp.delete(graph, `nodes.${index}`)
    }
  }
  for (let patientId in patients) {
    if (patients[patientId].travel !== null && patients[patientId].travel[0]) {
      patients[patientId].travel.forEach(loc => {
        let edge = {
          from: hash(loc),
          to: patients[patientId].patientId,
          length: 500,
          dashes: true,
          arrows: {
            to: {
              enabled: false,
            },
          },
          color: { opacity: '0.2' },
        }

        let edgeIndex = _.findIndex(graph.edges, function(o) {
          return o.to == edge.to && o.from === edge.from
        })

        graph = dotProp.delete(graph, `edges.${edgeIndex}`)
      })
    }
  }
  return graph
}
