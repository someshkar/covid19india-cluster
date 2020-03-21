import hash from 'object-hash'
import _ from 'lodash'
import dotProp from 'dot-prop-immutable'

import { plane_node } from '../../images'

export const addTravel = (graph, patients) => {
  let travelHistories = {}
  let locations = []

  for (let patientId in patients) {
    if (patients[patientId].travel !== null) {
      if (patients[patientId].travel.length !== 0) {
        travelHistories[hash(patients[patientId].travel)] =
          patients[patientId].travel
      }
    }
  }

  for (let key in travelHistories) {
    travelHistories[key].forEach(location => {
      if (!locations.includes(location)) {
        locations.push(location)
      }
    })
  }

  locations.forEach(location => {
    let node = {
      id: hash(location),
      label: location,
      size: 40,
      shape: 'image',
      image: plane_node,
    }
    graph = dotProp.set(graph, 'nodes', list => [...list, node])
  })

  for (let patientId in patients) {
    for (let location in patients[patientId].travel) {
      let edge = {
        from: hash(location),
        to: patientId,
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
  }

  return graph
}

export const removeTravel = (graph, patients) => {
  let travelHistories = {}
}
