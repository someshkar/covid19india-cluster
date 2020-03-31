import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import SmallCard from '../../components/Portal/SmallCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SourcesListItem from '../../components/Portal/SourcesListItem'
import ReactLoading from 'react-loading'
import Layout from '../../components/layout'
import _ from 'lodash'

function PatientDetail({ id }) {
  console.log(id)

  const dummyPatient = {
    patientId: 1,
    reportedOn: '30/01/2020',
    ageEstimate: '20',
    name: 'Random Name',
    phone: 9828293902,
    address: '5 Janpath',
    hospital: 'RML Hospital',
    facility: 'Hotel Taj',
    health: 'Recovered',
    quarantine: 'Quarantined at facility',
    notes: 'These are nice notes',
    gender: 'Female',
    contractedFrom: '',
  }

  const [patient, setPatient] = useState(dummyPatient)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('/api/raw', { cors: 'no-cors', method: 'GET' })
      .then(resp => resp.json())
      .then(async res => {
        console.log(res)

        let selectedPatient = await _.find(
          res.data.rawPatientData,
          o => o.patientId === parseInt(id)
        )

        console.log('selected', selectedPatient)
        setPatient(selectedPatient)
        setLoading(false)
      })
      .catch(console.error)
  }, [setPatient])

  return (
    <Layout>
      {loading ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40px',
          }}
        >
          <ReactLoading type="spin" color="#000" />
        </div>
      ) : (
        <main
          className="container"
          style={{ minHeight: '80vh', marginTop: '3vh', fontFamily: 'Lato' }}
        >
          <div className="row">
            <div className="col-12">
              <h3 className="h4 my-2">Patient {patient.patientId}</h3>
            </div>
          </div>

          <div className="row my-2">
            <div className="col p-1">
              <SmallCard
                icon="bullhorn"
                title="Reported"
                content={patient.reportedOn}
              />
            </div>

            <div className="col p-1">
              <SmallCard
                icon="heartbeat"
                title="Name"
                content={patient.name ? patient.name : '-'}
              />
            </div>
            <div className="col p-1">
              <SmallCard
                icon="map-marker-alt"
                title="Phone"
                content={patient.phone ? patient.phone : '-'}
              />
            </div>
            <div className="col p-1">
              <SmallCard
                icon="venus-mars"
                title="Gender"
                content={patient.gender ? patient.gender : '-'}
              />
            </div>
            <div className="col p-1">
              <SmallCard
                icon="user-plus"
                title="Age"
                content={patient.ageEstimate ? patient.ageEstimate : '-'}
              />
            </div>

            <div className="col p-1">
              <SmallCard
                icon="globe-asia"
                title="Health"
                content={patient.health ? patient.health : '-'}
              />
            </div>
          </div>

          <div className="row my-2">
            <div className="col-12 col-md-8 p-1">
              <div className="card">
                <div className="card-header">
                  <strong>Details</strong>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Home Address :</strong>{' '}
                    {patient.address ? patient.address : 'N/A'}
                  </li>
                  <li className="list-group-item">
                    <strong>Hospital : </strong>
                    {patient.hospital ? patient.hospital : 'N/A'}
                  </li>
                  <li className="list-group-item">
                    <strong>Facility : </strong>
                    {patient.facility ? patient.facility : 'N/A'}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-4 p-1">
              <div className="card mb-2">
                <div className="card-header">
                  <strong>Quarantine Status</strong>
                </div>
                <div className="card-body">
                  {patient.quarantine ? patient.quarantine : '-'}
                </div>
              </div>

              <div className="card my-2">
                <div className="card-header">
                  <strong>Notes</strong>
                </div>
                <div className="card-body">
                  {patient.notes ? patient.notes : '-'}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Link href="/">
                <div style={{ cursor: 'pointer', float: 'left' }}>
                  <FontAwesomeIcon icon="angle-double-left" className="mr-2" />
                  Back
                </div>
              </Link>
            </div>
          </div>
        </main>
      )}
    </Layout>
  )
}

PatientDetail.getInitialProps = async function(context) {
  const { id } = context.query

  return { id }
}

export default PatientDetail
