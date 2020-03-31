import React, { useState, useEffect } from 'react'
import ReactLoading from 'react-loading'
import axios from 'axios'

import Layout from '../components/layout'
import PatientTable from '../components/Portal/PatientTable'
import DownloadBlock from '../components/Portal/PatientTable'

function Home(props) {
  const [fetched, setFetched] = useState(false)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
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
        setLoading(false)
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
      <div
        className="container"
        style={{ maxWidth: '100vw', marginTop: '40px' }}
      >
        {error ? <div className="alert alert-danger">{error}</div> : ''}
        {loading ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ReactLoading type="spin" color="#000" />
          </div>
        ) : (
          <PatientTable patients={patients} />
        )}

        {/* <DownloadBlock patients={patients} /> */}
      </div>
    </Layout>
  )
}

export default Home
