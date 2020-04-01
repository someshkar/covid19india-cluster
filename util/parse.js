import {
  male_hosp,
  male_cured,
  male_dead,
  female_cured,
  female_hosp,
  female_dead,
} from '../images/index'
import dotProp from 'dot-prop-immutable'

export function letterToCode(str) {
  const letterPos = parseInt(str[0], 36)
  return parseInt(letterPos.toString() + str.substring(1))
}

export function getIcon(patient) {
  if (patient.gender === 'male') {
    if (patient.status === 'Recovered') {
      return male_cured
    } else if (patient.status === 'Hospitalized') {
      return male_hosp
    } else if (patient.status === 'Deceased') {
      return male_dead
    } else {
      return male_hosp
    }
  } else if (patient.gender === 'female') {
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

export const codeToLetter = (code) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const codeStr = code.toString()

  const letterPos = parseInt(codeStr[0] + codeStr[1])

  return letters[letterPos - 10] + codeStr.substring(2)
}

export const rowsToGraph = rows => {
  let graph = {
    nodes: [],
    edges: [],
  }

  rows.forEach(row => {
    const patientCode = letterToCode('P' + row.patientId)
    let node = {
      id: patientCode,
      label: 'P' + row.patientId,
      shape: 'image',
      image: getIcon(row),
      group: 'patient'
    }

    graph = dotProp.set(graph, 'nodes', list => [...list, node])

    if (row.contractedFrom) {
      let edge = {
        from: letterToCode(row.contractedFrom),
        to: patientCode,
      }

      graph = dotProp.set(graph, 'edges', list => [...list, edge])
    }
  })
  return graph
}