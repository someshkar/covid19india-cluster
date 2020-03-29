import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Layout from '../components/layout'
import PatientTable from '../components/Portal/PatientTable'
import DownloadBlock from '../components/Portal/PatientTable'

function Home(props) {
  const [fetched, setFetched] = useState(false)
  const [patients, setPatients] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchRawData() {
      const response = await axios.get(
        // 'https://api.covid19india.org/raw_data.json'
        '/api/raw'
      )
      if (response.data) {
        // setPatients(response.data.raw_data.filter(p => p.detectedstate))
        console.log(response.data)
        setPatients(response.data.data.rawPatientData)
        setFetched(true)
      } else {
        setError("Couldn't fetch patient data. Try again after sometime.")
        console.log(response)
      }
    }

    if (!fetched) {
      fetchRawData()
    }
  }, [fetched])

  return (
    <Layout>
      <div className="container">
        {error ? <div className="alert alert-danger">{error}</div> : ''}
        <PatientTable patients={patients} />
        {/* <DownloadBlock patients={patients} /> */}
      </div>
    </Layout>
  )
}

export default Home
