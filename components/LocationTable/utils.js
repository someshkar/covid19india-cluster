// [
//     {
//       hospital: 'RML',
//       total: 56,
//       underTreatment: 45,
//       recovered: 26,
//       deceased: 2,
//     },
//     {
//       hospital: 'LNJP',
//       total: 56,
//       underTreatment: 45,
//       recovered: 26,
//       deceased: 2,
//     },
//   ]

import hash from 'object-hash'

export const generateHospitalTable = patients => {
  const hospitals = {}

  console.log(patients)
  patients.forEach(patient => {
    if (patient.hospital) {
      let keyHash = hash(patient.hospital)
      if (!hospitals[keyHash]) {
        hospitals[keyHash] = {
          hospital: patient.hospital,
          total: 1,
          inTreatment: 0,
          recovered: 0,
          deceased: 0,
        }
        if (patient.health === 'Recovered') {
          hospitals[keyHash].recovered += 1
        } else if (patient.health === 'Deceased') {
          hospitals[keyHash].deceased += 1
        } else if (patient.health === 'In Treatment') {
          hospitals[keyHash].inTreatment += 1
        }
      } else {
        hospitals[keyHash].total += 1
        console.log(patient.health)
        if (patient.health === 'Recovered') {
          hospitals[keyHash].recovered += 1
        } else if (patient.health === 'Deceased') {
          hospitals[keyHash].deceased += 1
        } else if (patient.health === 'In Treatment') {
          hospitals[keyHash].inTreatment += 1
        }
      }
    }
  })

  var hospitalList = []

  for (var hospital in hospitals) {
    hospitalList.push(hospitals[hospital])
  }

  return hospitalList
}

export const generateFacilityTable = patients => {
  const facilities = {}

  patients.forEach(patient => {
    if (patient.facility) {
      let keyHash = hash(patient.facility)
      if (!facilities[keyHash]) {
        facilities[keyHash] = {
          facility: patient.facility,
          total: 1,
          inQuarantine: 0,
          recovered: 0,
          deceased: 0,
        }
        if (patient.health === 'Recovered') {
          facilities[keyHash].recovered += 1
        } else if (patient.health === 'Deceased') {
          facilities[keyHash].deceased += 1
        } else if (
          patient.health === 'In Quarantine' &&
          patient.quarantine === 'Quarantined at facility'
        ) {
          facilities[keyHash].inQuarantine += 1
        }
      } else {
        facilities[keyHash].total += 1
        console.log(patient.health)
        if (patient.health === 'Recovered') {
          facilities[keyHash].recovered += 1
        } else if (patient.health === 'Deceased') {
          facilities[keyHash].deceased += 1
        } else if (
          patient.health === 'In Quarantine' &&
          patient.quarantine === 'Quarantined at facility'
        ) {
          facilities[keyHash].inQuarantine += 1
        }
      }
    }
  })

  var facilitiesList = []

  for (var facility in facilities) {
    facilitiesList.push(facilities[facility])
  }

  return facilitiesList
}
