import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import SmallCard from '../../components/Portal/SmallCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SourcesListItem from '../../components/Portal/SourcesListItem'
import Layout from '../../components/layout'
import _ from 'lodash'

function PatientDetail({ id }) {
  console.log(id)

  // const dummyPatient = {
  //   id: 1,
  //   diagnosed_date: '2020-01-30',
  //   age: 20,
  //   gender: 'Female',
  //   detected_city: 'Thrissur',
  //   detected_district: 'Thrissur',
  //   detected_state: 'Kerala',
  //   nationality: 'India',
  //   current_status: 'Recovered',
  //   notes: 'Travelled from Wuhan.\nStudent from Wuhan',
  //   contacts: [],
  // }

  const dummyPatient = {
    patientId: 1,
    reportedOn: '30/01/2020',
    onsetEstimate: '',
    ageEstimate: '20',
    gender: 'Female',
    city: 'Thrissur',
    state: 'Kerala',
    district: 'Thrissur',
    status: 'Recovered',
    contractedFrom: '',
    sources: [
      'https://twitter.com/vijayanpinarayi/status/1222819465143832577',
      'https://weather.com/en-IN/india/news/news/2020-02-14-kerala-defeats-coronavirus-indias-three-covid-19-patients-successfully',
    ],
  }

  const [patient, setPatient] = useState(dummyPatient)
  useEffect(() => {
    fetch('/api/raw', { cors: 'no-cors', method: 'GET' })
      .then(resp => resp.json())
      .then(async res => {
        console.log(res)
        // const selectedPatient = res.data.rawPatientData.filter(
        //   obj => obj.patientId === id
        // )

        let selectedPatient = await _.find(
          res.data.rawPatientData,
          o => o.patientId === parseInt(id)
        )

        console.log('selected', selectedPatient)
        setPatient(selectedPatient)
      })
      .catch(console.error)
  }, [setPatient])

  return (
    <Layout>
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
              title="Announced"
              content={patient.date}
            />
          </div>
          <div className="col p-1">
            <SmallCard
              icon="venus-mars"
              title="Gender"
              content={patient.gender}
            />
          </div>
          <div className="col p-1">
            <SmallCard icon="user-plus" title="Age" content={patient.age} />
          </div>
          <div className="col p-1">
            <SmallCard
              icon="heartbeat"
              title="Status"
              content={patient.status}
            />
          </div>
          <div className="col p-1">
            <SmallCard
              icon="map-marker-alt"
              title="State"
              content={patient.state}
            />
          </div>
          <div className="col p-1">
            <SmallCard
              icon="globe-asia"
              title="Country"
              content={patient.nationality}
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
                  <strong>City:</strong> {patient.city}
                </li>
                <li className="list-group-item">
                  <strong>District:</strong> {patient.district}
                </li>
                <li className="list-group-item">
                  <strong>Notes:</strong> {patient.notes}
                </li>
                <SourcesListItem id={patient.patientId} />
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-4 p-1">
            <div className="card mb-2">
              <div className="card-header">
                <strong>Status Change</strong>
              </div>
              <div className="card-body">
                {patient.status_change_date ? (
                  'NA'
                ) : patient.status_change_date === patient.diagnosed_date ? (
                  'No updates available'
                ) : (
                  <>
                    <p>
                      <strong>Changed on: </strong> {patient.status_change_date}
                    </p>
                    <p>
                      <strong>Current Status: </strong> {patient.current_status}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="card my-2">
              <div className="card-header">
                <strong>Connected to</strong>
              </div>
              <div className="card-body p-0">
                {/* {patient.contractedFrom ? (
                  <ul className="list-group list-group-flush">
                    {patient.contacts.map(c => {
                      return (
                        <li className="list-group-item">
                          <Link href={`/patient/${c}`}>Patient {c}</Link>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="m-3">No known contacts</p>
                )} */}
              </div>
            </div>

            {/*
          <div className="card my-2">
          <div className="card-header"><strong>Contribute</strong></div>
          <div className="card-body">
          If the information in this page is wrong or missing any details, kindly
          provide us with the right or new information.
          <ul className="mt-2 p-0" style={{ listStyle: 'none' }}>
          <li className="py-2">
          <a href="#" className="text-danger" data-toggle="modal" data-target="#report-modal">
          <FontAwesomeIcon icon="exclamation-circle" className="d-inline-block mr-2" />
          Report Error
          </a>
          </li>
          </ul>
          </div>
          </div>
        */}
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
    </Layout>
  )
}

PatientDetail.getInitialProps = async function(context) {
  const { id } = context.query

  return { id }
}

export default PatientDetail
