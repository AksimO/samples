import { CALL_API } from './middleware/api'
import 'whatwg-fetch'

export const FETCH_CONDITIONS_SUCCESS = 'FETCH_CONDITIONS_SUCCESS'
export const FETCH_CONDITIONS_FAILURE = 'FETCH_CONDITIONS_FAILURE'


export function fetchConditions(state, city) {
  return {
    [CALL_API]: {
      endpoint: `conditions/q/${state}/${city}.json`,
      types: [FETCH_CONDITIONS_SUCCESS, FETCH_CONDITIONS_FAILURE]
    }
  }
}