import hash from 'object-hash'
import { state_node } from '../../images'
import _ from 'lodash'
import dotProp from 'dot-prop-immutable'

export const addStates = (graph, patients, states) => {
  
  for (const stateName in states) {
    if (states.hasOwnProperty(stateName)) {
      const stateKey = states[stateName];
      let node = {
        id: stateKey,
        label: stateName,
        size: 40,
        shape: 'image',
        image: state_node,
        group: 'state'
      }
      graph = dotProp.set(graph, 'nodes', list => [...list, node])
    }
  }

  for (let patientId in patients) {
    if(!patients[patientId].state){
      console.log(patients[patientId]);
      continue;
    }
    let edge = {
      from: states[patients[patientId].state],
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

export const removeStates = (graph, patients, states) => {
  
  for (var stateName in states) {
    let index = _.findIndex(dotProp.get(graph, 'nodes'), function(o) {
      return o.id == states[stateName]
    })

    if (index !== -1) {
      graph = dotProp.delete(graph, `nodes.${index}`)
    }
  }

  for (let patientId in patients) {
    
    if(!patients[patientId].state) continue;

    let edgeFrom = states[patients[patientId].state];
    let edgeTo =  patients[patientId].patientId;
    let edgeIndex = _.findIndex(graph.edges, function(o) {
      return o.to == edgeTo && o.from === edgeFrom
    })

    graph = dotProp.delete(graph, `edges.${edgeIndex}`)
  }

  return graph
}