/**
 * Action Types
 *
 * all action
 */

// Action Types
import actionTypes from './actionTypes'

const updateGraph = graph => (dispatch, getState) => {
  // Dispatch the result.
  dispatch({
    type: actionTypes.UPDATE_GRAPH,
    payload: {
      graph: graph,
    },
  })
}

const updatePatients = patients => (dispatch, getState) => {
  // Dispatch the result.
  dispatch({
    type: actionTypes.UPDATE_PATIENTS,
    payload: {
      patients: patients,
    },
  })
}

const updateLastRefreshed = lastRefreshed => (dispatch, getState) => {
  // Dispatch the result.
  dispatch({
    type: actionTypes.UPDATE_LAST_REFRESHED,
    payload: {
      lastRefreshed: lastRefreshed,
    },
  })
}

const selectPatient = patient => (dispatch, getState) => {
  // Dispatch the result.
  dispatch({
    type: actionTypes.SELECT_PATIENT,
    payload: patient,
  })
}

const selectFilter = filter => (dispatch, getState) => {
  // Dispatch the result.
  dispatch({
    type: actionTypes.SELECT_FILTER,
    payload: {
      filter: filter,
    },
  })
}

const setSearchTerm = term => (dispatch, getState) => {
  dispatch({
    type: actionTypes.SEARCH,
    payload: {
      term,
    },
  })
}

const updateStates = states => (dispatch, getState) => {
  console.log('Action updateStates', states);
  dispatch({
    type: actionTypes.UPDATE_STATES,
    payload: {
      states,
    },
  })
}

// Export the actions.
export { updateGraph, updatePatients, updateLastRefreshed, selectPatient, selectFilter, setSearchTerm, updateStates}
