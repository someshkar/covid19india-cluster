import React from 'react'
import { useParams, Link } from 'react-router-dom'
import SmallCard from '../components/Portal/SmallCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SourcesListItem from '../components/Portal/SourcesListItem'

function PatientDetail({ patients }) {
  const { id } = useParams()
  const patient = patients.find(p => p.id === parseInt(id))

  return (
    <main className="container" style={{ minHeight: '80vh' }}>
      <div className="row">
        <div className="col-12">
          <h3 className="h4 my-2">Patient {patient.id}</h3>
        </div>
      </div>

      <div className="row my-2">
        <div className="col p-1">
          <SmallCard
            icon="bullhorn"
            title="Announced"
            content={patient.diagnosed_date}
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
            content={patient.current_status}
          />
        </div>
        <div className="col p-1">
          <SmallCard
            icon="map-marker-alt"
            title="State"
            content={patient.detected_state}
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
                <strong>City:</strong> {patient.detected_city}
              </li>
              <li className="list-group-item">
                <strong>District:</strong> {patient.detected_district}
              </li>
              <li className="list-group-item">
                <strong>Notes:</strong> {patient.notes}
              </li>
              <SourcesListItem id={patient.id} />
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
              {patient.contacts.length ? (
                <ul className="list-group list-group-flush">
                  {patient.contacts.map(c => {
                    return (
                      <li className="list-group-item">
                        <Link to={`/patient/${c}`}>Patient {c}</Link>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="m-3">No known contacts</p>
              )}
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
          <Link to="/">
            <FontAwesomeIcon icon="angle-double-left" className="mr-2" />
            Back
          </Link>
        </div>
      </div>
    </main>
  )
}

export default PatientDetail
