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
const selectPatient = patient => (dispatch, getState) => {
  // Dispatch the result.
  dispatch({
    type: actionTypes.SELECT_PATIENT,
    payload: {
      patient: patient,
    },
  })
}

// Export the actions.
export { updateGraph, updatePatients, selectPatient }
