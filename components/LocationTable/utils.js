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
          total: 0,
          inTreatment: 0,
          recovered: 0,
          deceased: 0,
        }
      } else {
        hospitals[keyHash].total += 1
        switch (patient.health) {
          case 'Recovered': {
            hospitals[keyHash].recovered += 1
          }
          case 'In Treatment': {
            hospitals[keyHash].inTreatment += 1
          }
          case 'Deceased': {
            hospitals[keyHash].deceased += 1
          }
        }
      }
    }
  })

  //   patients.forEach(patient => {
  //     if (patient.hospital) {
  //       let keyHash = hash(patient.hospital)
  //       if (!hospitals[keyHash]) {
  //         hospitals[keyHash] = patient.hospital
  //       }
  //     }
  //   })

  var hospitalList = []

  for (var hospital in hospitals) {
    hospitalList.push(hospitals[hospital])
  }

  return hospitalList
}
