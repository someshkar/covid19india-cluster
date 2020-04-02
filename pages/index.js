import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactLoading from 'react-loading'
import axios from 'axios'

import { parseCookies } from '../util/parse'

import Layout from '../components/layout'
import PatientTable from '../components/Portal/PatientTable'
import DownloadBlock from '../components/Portal/PatientTable'

function Home(props) {
  const router = useRouter()

  useEffect(() => console.log(props.auth), [])

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
          <PatientTable patients={patients} search={router.query.search} />
        )}

        {/* <DownloadBlock patients={patients} /> */}
      </div>
    </Layout>
  )
}

Home.getInitialProps = ({ req, res }) => {
  const cookies = parseCookies(req)

  if (res && !cookies.auth) {
    res.writeHead(302, { Location: '/login' })
    res.end()

    return {
      auth: false,
    }
  }

  return {
    auth: cookies.auth,
  }
}

export default Home
