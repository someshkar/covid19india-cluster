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

// const dumpedRows = require('../../api/dump.json')
// import dumpedRows from '../../api/dump.json'

import {
  male_hosp,
  male_cured,
  male_dead,
  female_cured,
  female_hosp,
  female_dead,
} from '../../images/index'

function letterToCode(str) {
  const letterPos = parseInt(str[0], 36)
  return parseInt(letterPos.toString() + str.substring(1))
}

function getIcon(patient) {
  if (patient.gender === 'M') {
    if (patient.status === 'Recovered') {
      return male_cured
    } else if (patient.status === 'Hospitalized') {
      return male_hosp
    } else if (patient.status === 'Deceased') {
      return male_dead
    } else {
      return male_hosp
    }
  } else if (patient.gender === 'F') {
    if (patient.status === 'Recovered') {
      return female_cured
    } else if (patient.status === 'Hospitalized') {
      return female_hosp
    } else if (patient.status === 'Deceased') {
      return female_dead
    } else {
      return female_hosp
    }
  } else {
    return female_hosp
  }
}

function codeToLetter(code) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const codeStr = code.toString()

  const letterPos = parseInt(codeStr[0] + codeStr[1])

  return letters[letterPos - 10] + codeStr.substring(2)
}

function rowsToGraph(rows) {
  let graph = {
    nodes: [],
    edges: [],
  }

  rows.forEach(row => {
    const patientCode = letterToCode(row.patientId)

    let node = {
      id: patientCode,
      label: row.patientId,
      shape: 'image',
      image: getIcon(row),
    }

    graph.nodes.push(node)

    if (row.contractedFrom) {
      let edge = {
        from: letterToCode(row.contractedFrom),
        to: patientCode,
      }

      graph.edges.push(edge)
    }
  })

  return graph
}

module.exports = {
  rowsToGraph,
  codeToLetter,
  letterToCode,
  getIcon,
}

// console.log(letterToCode('P699999'))
// console.log(codeToLetter(letterToCode('P6')))

// console.log(jsonToGraph(dumpedRows))
