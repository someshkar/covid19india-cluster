/**
 * Graph Reducer
 *
 * Creates a Redux reducer for populating the graph.
 */

// Action Types
import actionTypes from './actionTypes'
import hash from 'object-hash'

// Setup initial state with an fleet info object.
const initialState = {
  filter: 'P2P',
  selected: null,
  graph: null,
  rawData: null,
  patients: null,
  searchTerm: '',
  states: null,
  legendType : ''
}

// Export the Device Reducer.
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_FILTER: {
      const { filter } = action.payload
      return { ...state, filter: filter }
    }
    case actionTypes.SEARCH: {
      const { term } = action.payload
      return { ...state, searchTerm: term }
    }
    case actionTypes.SELECTED_LEGEND: {
      const { legendType } = action.payload
      return { ...state, legendType: legendType }
    }
    case actionTypes.UPDATE_GRAPH: {
      const { graph } = action.payload
      return { ...state, graph: graph }
    }
    case actionTypes.UPDATE_RAW_DATA: {
      const { rawData } = action.payload
      return { ...state, rawData: rawData }
    }
    case actionTypes.UPDATE_PATIENTS: {
      const { patients } = action.payload
      return { ...state, patients: patients, patient: patients.byId[251] } // `P1` in code
    }
    case actionTypes.UPDATE_LAST_REFRESHED: {
      const { lastRefreshed } = action.payload
      return { ...state, lastRefreshed: lastRefreshed }
    }
    case actionTypes.SELECT_PATIENT: {
      const { id, coords } = action.payload
      const { patients } = state
      const existingPatient = patients.byId[id]
      const patient = {
        ...patients.byId[id],
        coords
      }
      return existingPatient ? { ...state, patient } : state
    }
    case actionTypes.UPDATE_STATES: {
      let states = action.payload.states.reduce((accumulator, currentValue) => {
        accumulator[currentValue] = hash(currentValue);
        return accumulator;
      },{});
      return {...state, states: states}
    }
    default:
      return state
  }
}
