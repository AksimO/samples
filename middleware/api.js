var Symbol = require('es6-symbol')

/**
 * @fixme in a real app, wunderground api key (and url) should be stored in a node environment variable.
 */
const BASE_URL = 'http://api.wunderground.com/api/6135f78e52c9e3ca/'

function callApi(endpoint) {

  let apiUrl = BASE_URL
  return fetch(apiUrl + endpoint)
      .then(response =>
    response.json()
      .then(json => ({ json, response }))
  ).then(({ json, response }) => {

    /**
     * @todo  rework this - currently the fetch api returns 'success' even when status code is > 400
     */
    json.status = (typeof (response.status !== 'undefined')) ? response.status : null
    return json

  }).catch(err => {

    console.log(err)
    let serverError = {
      status: 500,
      server_error: ["There was a problem retrieving the data"]
    }
    return serverError
  })
}


export const CALL_API = Symbol('Call API')
export default store => next => action => {

  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types } = callAPI
  const [ successType, errorType ] = types

  return callApi(endpoint).then(
    response =>
      {
        if (response.status >= 400) {
          next({
          error: response,
          type: errorType
        })
      } else {
        next({
        response,
        type: successType
    })
  }
},
  error => next({
    error: error.message || 'There was an error.',
    type: errorType
  })
)
}