import hash from 'object-hash'
import _ from 'lodash'
import dotProp from 'dot-prop-immutable'

import { oneTo20, twentyTo30, thirtyTo40, fortyTo50, fiftyTo60, sixtyTo70, seventyUp } from '../../images'

export const addAge = (graph, patients) => {
    let ages = {}

    for (let patientId in patients) {
        if (patients[patientId].ageEstimate !== null) {
            let age = patients[patientId].ageEstimate
            age = ageFiltration(age)

            ages[hash(age)] = age
        }
    }

    for (let age in ages) {
        let node = {
            id: age,
            label: ages[age],
            size: 30,
            shape: 'image',
            image: ageFiltrationIcons(ages[age])
        }
        graph = dotProp.set(graph, 'nodes', list => [...list, node])
    }

    // Add edges from patient to ages
    for (let patientId in patients) {
        if (
            patients[patientId].ageEstimate !== null &&
            patients[patientId].ageEstimate[0]
        ) {
            let age = patients[patientId].ageEstimate
            age = ageFiltration(age)

            let edge = {
                from: hash(age),
                to: patients[patientId].patientId,
                length: 700,
                dashes: true,
                arrows: {
                    to: {
                        enabled: false,
                    },
                },
                color: { opacity: '0.2' },
            }

            graph = dotProp.set(graph, 'edges', list => [...list, edge])
        }
    }

    return graph
}

export const removeAge = (graph, patients) => {
    let ages = {}

    for (let patientId in patients) {
        if (patients[patientId].ageEstimate !== null) {
            let age = patients[patientId].ageEstimate
            age = ageFiltration(age)

            ages[hash(age)] = age
        }
    }

    for (let age in ages) {
        let node = {
            id: age,
            label: ages[age],
            size: 30,
            shape: 'image',
            image: ageFiltrationIcons(ages[age])
        }
        let index = _.findIndex(dotProp.get(graph, 'nodes'), function (o) {
            return o.id == node.id
        })
        if (index !== -1) {
            graph = dotProp.delete(graph, `nodes.${index}`)
        }
    }

    for (let patientId in patients) {
        if (
            patients[patientId].ageEstimate !== null &&
            patients[patientId].ageEstimate[0]
        ) {
            let age = patients[patientId].ageEstimate
            age = ageFiltration(age)

            let edge = {
                from: hash(age),
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

            let edgeIndex = _.findIndex(graph.edges, function (o) {
                return o.to == edge.to && o.from === edge.from
            })

            graph = dotProp.delete(graph, `edges.${edgeIndex}`)
        }
    }
    return graph
}

const ageFiltration = (age) => {
    return age >= 70 ? "70 up" : age >= 60 ? "60 - 70" : age >= 50 ? "50 - 60" : age >= 40 ? "40 - 50" : age >= 30 ? "30 - 40" : age >= 20 ? "20 - 30" : "1 - 20"
}

const ageFiltrationIcons = (age) => {
    return age === "70 up" ? seventyUp : age === "60 - 70" ? sixtyTo70 : age === "50 - 60" ? fiftyTo60 : age === "40 - 50" ? fortyTo50 : age === "30 - 40" ? thirtyTo40 : age === "20 - 30" ? twentyTo30 : oneTo20
}
