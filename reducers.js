import { combineReducers } from 'redux'
import { FETCH_CONDITIONS_SUCCESS, FETCH_CONDITIONS_FAILURE } from './actions'

// get conditions
function getConditions(state = {
  conditions: {},
  getConditionsError: null
}, action) {
  switch (action.type) {
    case FETCH_CONDITIONS_SUCCESS:
      return Object.assign({}, state, {
        conditions: action.response.current_observation,
      })
    case FETCH_CONDITIONS_FAILURE:
      return Object.assign({}, state, {
        conditions: {},
        getConditionsError: action.error,
      })
    default:
      return state
  }
}

const WeatherAppState = combineReducers({
  getConditions
})

export default WeatherAppState