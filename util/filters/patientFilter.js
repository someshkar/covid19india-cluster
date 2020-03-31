import hash from 'object-hash'
import dotProp from 'dot-prop-immutable'
import { getIcon, letterToCode, codeToLetter } from '../parse'


export const filterPatients = (graph, patients, status, globalFilter) => {


    // console.log('GRAPH IN PATIENT FILTER: ', graph)

    // let filteredPatients = []


    let newGraph = {
        nodes: [],
        edges: []
    }

    // looping through each key in the patients object
    for (let patientId in patients) {
        // console.log('PATIENT ID: ', patientId)

        // find the correct patients for the selected patient type
        if (patients[patientId].status === status) {
            let node = {
                id: letterToCode(patientId),
                label: codeToLetter(patientId),
                shape: 'image',
                image: getIcon(patients[patientId]),
                group: 'patient'
            }

            // adding patients as nodes to the new graph
            newGraph = dotProp.set(newGraph, 'nodes', list => [...list, node])

            // adding edges for contractedFrom of the fitlered patient
            if (patients[patientId].contractedFrom) {
                let edge = {
                    from: letterToCode(patients[patientId].contractedFrom),
                    to: patients[patientId].patientId,
                }

                newGraph = dotProp.set(newGraph, 'edges', list => [...list, edge])
            }

        }

    }

    // adding the other nodes in the array as per the global filter
    if (['State', 'City', 'Travel'].includes(globalFilter)) {
        graph.nodes.forEach(node => {
            if (node.group !== 'patient') {
                console.log('non patietnt node found: ', node)
                newGraph = dotProp.set(newGraph, 'nodes', list => [...list, node])
            } else {
                // let kepMap ={
                //     'State': 'state',
                // }
                let edge = {
                    from: hash(patients[node.id].state),
                    to: patients[node.id].patientId,
                    length: 250,
                    dashes: true,
                    arrows: {
                        to: {
                            enabled: false,
                        },
                    },
                    color: { opacity: '0.3' },
                }
                newGraph = dotProp.set(newGraph, 'edges', list => [...list, edge])
            }
        })

        // graph.nodes.forEach(node => {

        // })

    }


    // graph['nodes'].forEach(node => {
    //     if (node.group == 'patient' && patients[node.id]['status'] == status) {
    //         newGraph = dotProp.set(newGraph, 'nodes', list => [...list, node])


    //         if (patients[node.id].contractedFrom) {
    //             let edge = {
    //                 from: letterToCode(patients[node.id].contractedFrom),
    //                 to: patients[node.id].patientId,
    //             }
    //             newGraph = dotProp.set(newGraph, 'edges', list => [...list, edge])
    //         }
    //     } else if (node.group === 'state') {
    //         newGraph = dotProp.set(newGraph, 'nodes', list => [...list, node])
    //     }

    // })




    // console.log('GRAPH IN FITLER FUNCTION: ', newGraph)


    return newGraph;
}