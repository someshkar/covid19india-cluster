import { letterToCode } from './parse'

export const normalize = array => {
  const newArray = {
    byId: {},
    allIds: [],
  }

  array.forEach(item => {
    let patientCode = letterToCode('P' + item.patientId)
    item.patientId = patientCode
    newArray.byId[patientCode] = item
    newArray.allIds.push(patientCode)
  })
  return newArray
}
