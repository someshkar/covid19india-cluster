import hash from 'object-hash'
import { state_node, city_node, plane_abroad_node, plane_local_node } from '../../images'
import _ from 'lodash'
import dotProp from 'dot-prop-immutable'

export const addAll= (graph, patients) => {
  let states = {}
  let stateCitiesMap = {}
  let locations = {}

  for (let patientId in patients) {
    let city = patients[patientId].city
      ? patients[patientId].city
      : patients[patientId].district
    if (!states[hash(patients[patientId].state)]) {
      states[hash(patients[patientId].state)] = patients[patientId].state
      if (!stateCitiesMap[hash(patients[patientId].state)]) {
        stateCitiesMap[hash(patients[patientId].state)] = {}
      }
    }
    if (
      !stateCitiesMap[hash(patients[patientId].state)][hash(city)] &&
      city !== ''
    ) {
      stateCitiesMap[hash(patients[patientId].state)][hash(city)] = city
    }

    if (patients[patientId].place_attributes !== null) {
        patients[patientId].place_attributes.forEach(loc => {
          if (!locations[hash(loc.place)]) {
            locations[hash(loc.place)] = loc
          }
        })
      }
  }

  console.log('State map: ', states, 'State Cities Map:', stateCitiesMap, 'Location :', locations) 

  for (var key in states) {
    let node = {
      id: key + 1,
      label: states[key],
      size: 30,
      shape: 'image',
      image: state_node,
    }
    let index = _.findIndex(dotProp.get(graph, 'nodes'), function(o) {
      return o.id == node.id
    })

    if (index === -1) {
      graph = dotProp.set(graph, 'nodes', list => [...list, node])
    }
  }

  for (var key in stateCitiesMap) {
    for (var cityKey in stateCitiesMap[key]) {
      let cityNode = {
        id: cityKey,
        label: stateCitiesMap[key][cityKey],
        size: 20,
        shape: 'image',
        image: city_node,
      }

      let index = _.findIndex(dotProp.get(graph, 'nodes'), function(o) {
        return o.id == cityNode.id
      })

      if (index === -1) {
        graph = dotProp.set(graph, 'nodes', list => [...list, cityNode])
      }
    }
  }

  for (let loc in locations) {
    let node = {
      id: loc,
      label: locations[loc].place,
      size: 30,
      shape: 'image',
      image: locations[loc].is_foreign ? plane_abroad_node : plane_local_node,
    }
    let index = _.findIndex(dotProp.get(graph, 'nodes'), function(o) {
        return o.id == node.id
    })

    if (index === -1) {
        graph = dotProp.set(graph, 'nodes', list => [...list, node])
    }
  }

  // Add edges from patient to location
  for (let patientId in patients) {
    if (
      patients[patientId].place_attributes !== null &&
      patients[patientId].place_attributes[0]
    ) {
      patients[patientId].place_attributes.forEach(loc => {
        let edge = {
          from: hash(loc.place),
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

  for (var key in stateCitiesMap) {
    for (var cityKey in stateCitiesMap[key]) {
      let edge = {
        from: key + 1,
        to: cityKey,
        length: 400,
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

  for (let patientId in patients) {
    let city = patients[patientId].city
      ? patients[patientId].city
      : patients[patientId].district
    let edge = {
      from: hash(city),
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

export const removeAll = (graph, patients) => {
    let states = {}
    let stateCitiesMap = {}
    let locations = {}

  for (let patientId in patients) {
    let city = patients[patientId].city
      ? patients[patientId].city
      : patients[patientId].district
    if (!states[hash(patients[patientId].state)]) {
      states[hash(patients[patientId].state)] = patients[patientId].state
      if (!stateCitiesMap[hash(patients[patientId].state)]) {
        stateCitiesMap[hash(patients[patientId].state)] = {}
      }
    }
    if (
      !stateCitiesMap[hash(patients[patientId].state)][hash(city)] &&
      city !== ''
    ) {
      stateCitiesMap[hash(patients[patientId].state)][hash(city)] = city
    }
    if (patients[patientId].place_attributes !== null) {
        patients[patientId].place_attributes.forEach(loc => {
          if (!locations[hash(loc.place)]) {
            locations[hash(loc.place)] = loc
          }
        })
      }
  }
  
    console.log('State map: ', states, 'State Cities Map:', stateCitiesMap, 'Location :', locations) 
  
    for (var key in states) {
        let node = {
          id: key + 1,
          label: states[key],
          size: 30,
          shape: 'image',
          image: state_node,
        }
        let index = _.findIndex(dotProp.get(graph, 'nodes'), function(o) {
          return o.id == node.id
        })
    
        if (index !== -1) {
          graph = dotProp.delete(graph, `nodes.${index}`)
        }
      }
    
      for (var key in stateCitiesMap) {
        for (var cityKey in stateCitiesMap[key]) {
          let cityNode = {
            id: cityKey,
            label: stateCitiesMap[key][cityKey],
            size: 40,
            shape: 'image',
            image: city_node,
          }
    
          let index = _.findIndex(dotProp.get(graph, 'nodes'), function(o) {
            return o.id == cityKey
          })
    
          if (index !== -1) {
            graph = dotProp.delete(graph, `nodes.${index}`)
          }
        }
      }
      for (var key in stateCitiesMap) {
        for (var cityKey in stateCitiesMap[key]) {
          let edge = {
            from: key + 1,
            to: cityKey,
            length: 400,
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
          if (edgeIndex !== -1) {
            graph = dotProp.delete(graph, `edges.${edgeIndex}`)
          }
        }
      }
    
      for (let patientId in patients) {
        let city = patients[patientId].city
          ? patients[patientId].city
          : patients[patientId].district
        let edge = {
          from: hash(city),
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
        if (edgeIndex !== -1) {
          graph = dotProp.delete(graph, `edges.${edgeIndex}`)
        }
      }

      for (let loc in locations) {
        let node = {
          id: loc,
          label: locations[loc].place,
          size: 30,
          shape: 'image',
          image: locations[loc].is_foreign ? plane_abroad_node : plane_local_node,
        }
        let index = _.findIndex(dotProp.get(graph, 'nodes'), function(o) {
          return o.id == node.id
        })
        if (index !== -1) {
          graph = dotProp.delete(graph, `nodes.${index}`)
        }
      }
    
      for (let patientId in patients) {
        if (
          patients[patientId].place_attributes !== null &&
          patients[patientId].place_attributes[0]
        ) {
          patients[patientId].place_attributes.forEach(loc => {
            let edge = {
              from: hash(loc.place),
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