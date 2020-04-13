// const graph = {
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

// OLD, don't use this schema
// const row = {
//       patientId: 'P' + rawRow['Patient number'],
//       dateAnnounced: rawRow['Date Announced'],
//       ageEstimate: rawRow['Age Bracket'],
//       gender: rawRow['Gender'],
//       city: rawRow['Detected City'],
//       district: rawRow['Detected District'],
//       state: rawRow['Detected State'],
//       status: rawRow['Current Status'],
//       notes: rawRow['Notes'],
//       contractedFrom: rawRow['Contracted from which Patient (Suspected)'],
//       sources: [rawRow['Source_1'], rawRow['Source_2'], rawRow['Source_3']],
//     }

// New schema
// const row = {
//       patientId: parseInt(rawRow['Patient number']), // Change in frontend, used to be 'P' + rawRow['Patient Number']
//       reportedOn: rawRow['Date Announced'],
//       onsetEstimate: '',
//       ageEstimate: rawRow['Age Bracket'],
//       gender: processGender(rawRow['Gender']), // Change in frontend, used to be 'M'/'F'
//       city: rawRow['Detected City'],
//       state: rawRow['Detected State'],
//       district: rawRow['Detected District'],
//       status: rawRow['Current Status'],
//       notes: rawRow['Notes'],
//       contractedFrom: rawRow['Contracted from which Patient (Suspected)'],
//       sources: processSources([
//         rawRow['Source_1'],
//         rawRow['Source_2'],
//         rawRow['Source_3'],
//       ]),
//     }

import {
  male_hosp,
  male_cured,
  male_dead,
  female_cured,
  female_hosp,
  female_dead,
  cluster_node,
} from '../images/index'
import hash from 'object-hash'

export function letterToCode(str) {
  const letterPos = parseInt(str[0], 36)
  return parseInt(letterPos.toString() + str.substring(1))
}

export function getIcon(patient) {
  switch (patient.status) {
    case 'Recovered':
      return patient.gender === 'male' ? male_cured : female_cured
    case 'Hospitalized':
      return patient.gender === 'male' ? male_hosp : female_hosp
    case 'Deceased':
      return patient.gender === 'male' ? male_dead : female_dead
    default:
      return patient.gender === 'male' ? male_hosp : female_hosp
  }
}

export const codeToLetter = code => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const codeStr = code.toString()

  const letterPos = parseInt(codeStr[0] + codeStr[1])

  return letters[letterPos - 10] + codeStr.substring(2)
}

const extractEvents = rows => {}

function getPatientNode(patientCode, row) {
    let node = {
        id: patientCode,
        label: 'P' + row.patientId,
        shape: 'image',
        image: getIcon(row),
        group: 'patient'
    }

    return node
}

export const rowsToGraph = (rows, removeLeafNode, addPInPatientId) => {
  let graph = {
    nodes: [],
    edges: [],
  }

  let clusters = {}

  let listOfConnectedCases = new Set()
  if(removeLeafNode){
    rows.forEach(row => {
      if (row.contractedFrom){
        listOfConnectedCases.add(letterToCode('P' + row.patientId))
        listOfConnectedCases.add(letterToCode(row.contractedFrom))
      }
    })
  }

  rows.forEach(row => {
    let patientCode = row.patientId;
    if(addPInPatientId)
    {
      patientCode = letterToCode('P' + row.patientId)
    }
    if (row.contractedFrom) {
      const CONTRACTED_FROM = row.contractedFrom
      const PATIENT_CODE_CONTRACTED_FROM = letterToCode(CONTRACTED_FROM)
      let edge = {}
      if (CONTRACTED_FROM[0] === 'E') {
        edge = {
           from: PATIENT_CODE_CONTRACTED_FROM,
           to: patientCode,
           length: 500,
           dashes: true,
        }
        const CONTRACTED_FROM_HASH = hash(CONTRACTED_FROM)
        // adding the cluster node
        if (!clusters[CONTRACTED_FROM_HASH]) {
          clusters[CONTRACTED_FROM_HASH] = CONTRACTED_FROM

          let clusterNode = {
              id: PATIENT_CODE_CONTRACTED_FROM,
              label: 'Event ' + CONTRACTED_FROM[1],
              shape: 'image',
              size: 60,
              image: cluster_node,
          }
          graph.nodes.push(clusterNode)
        }
      } else {
           edge = {
             from: PATIENT_CODE_CONTRACTED_FROM,
             to: patientCode,
           }
        }
        graph.edges.push(edge)
      }
      if (!removeLeafNode) {
        graph.nodes.push(getPatientNode(patientCode, row))
      } else if (listOfConnectedCases.has(patientCode)) {
        graph.nodes.push(getPatientNode(patientCode, row))
      }
  })
  return graph
}

// console.log(letterToCode('P699999'))
// console.log(codeToLetter(letterToCode('P6')))

// console.log(jsonToGraph(dumpedRows))
