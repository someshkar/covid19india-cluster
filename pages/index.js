import { useState, useEffect } from 'react'

import PatientTable from '../components/Portal/PatientTable'
import DownloadBlock from '../components/Portal/DownloadBlock'

const testData = [
  {
    id: 1,
    unique_id: '1',
    government_id: 'KL-TS-P1',
    diagnosed_date: '2020-01-30',
    age: 20,
    gender: 'Female',
    detected_city: 'Thrissur',
    detected_city_pt: 'SRID=4326;POINT (76.21325419999999 10.5256264)',
    detected_district: 'Thrissur',
    detected_state: 'Kerala',
    nationality: 'India',
    current_status: 'Recovered',
    status_change_date: '2020-02-14',
    notes: 'Travelled from Wuhan.\nStudent from Wuhan',
    current_location: '',
    current_location_pt: 'SRID=4326;POINT (76.21325419999999 10.5256264)',
    contacts: [],
  },
  {
    id: 2,
    unique_id: '2',
    government_id: 'KL-AL-P1',
    diagnosed_date: '2020-02-02',
    age: null,
    gender: 'Unknown',
    detected_city: 'Alappuzha',
    detected_city_pt: 'SRID=4326;POINT (76.333482 9.498000100000001)',
    detected_district: 'Alappuzha',
    detected_state: 'Kerala',
    nationality: 'India',
    current_status: 'Recovered',
    status_change_date: '2020-02-14',
    notes: 'Travelled from Wuhan.\nStudent from Wuhan',
    current_location: '',
    current_location_pt: 'SRID=4326;POINT (76.333482 9.498000100000001)',
    contacts: [],
  },
  {
    id: 3,
    unique_id: '3',
    government_id: 'KL-KS-P1',
    diagnosed_date: '2020-02-03',
    age: null,
    gender: 'Unknown',
    detected_city: 'Kasaragod',
    detected_city_pt: 'SRID=4326;POINT (80 20)',
    detected_district: 'Kasaragod',
    detected_state: 'Kerala',
    nationality: 'India',
    current_status: 'Recovered',
    status_change_date: '2020-02-14',
    notes: 'Travelled from Wuhan.\nStudent from Wuhan',
    current_location: '',
    current_location_pt: 'SRID=4326;POINT (80 20)',
    contacts: [],
  },
]

function getTable(patients) {
  if (patients.length) {
    return <PatientTable patients={patients} />
  }
  return <h3 className="h3 my-3">Loading...</h3>
}

function Home() {
  const [patients, setPatients] = useState(testData)

  // useEffect(
  //   () =>
  //     fetch('/api/raw', {
  //       cors: 'no-cors',
  //       method: 'GET',
  //     })
  //       .then(resp => resp.json())
  //       .then(res => {
  //         console.log(res)
  //         setPatients(res.data.rawPatientData)
  //       })
  //       .catch(console.error),
  //   [setPatients]
  // )

  return (
    <main className="container">
      <h3 className="h3 text-uppercase my-3">Affected Patients</h3>
      <PatientTable patients={patients} />
      {/* <DownloadBlock patients={patients} /> */}
    </main>
  )
}

// Home.getInitialProps = async function() {
//   let resp =
//     typeof window !== `undefined`
//       ? await fetch('/api/raw')
//       : await fetch('http://localhost:3000/api/raw')
//   const res = await resp.json()

//   console.log(res)

//   return {
//     patients: res.data.rawPatientData,
//   }
// }

export default Home
