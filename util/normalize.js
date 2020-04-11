import { letterToCode } from './parse'
const normalize = (array, addPInPatientId) => {
  const newArray = {
    byId: {},
    allIds: [],
  }

  array.forEach(item => {
    let patientCode = item.patientId
    if(addPInPatientId)
    {
     patientCode = letterToCode('P' + item.patientId)
    }
    item.patientId = patientCode
    newArray.byId[patientCode] = item
    newArray.allIds.push(patientCode)
  })
  return newArray
}

export default normalize
