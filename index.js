import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import WeatherApp from './components/WeatherApp'
import WeatherAppState from './reducers'
import thunkMiddleware from 'redux-thunk'
import api from './middleware/api'
import './styles/weatherapp.less'


let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

let store = createStoreWithMiddleware(WeatherAppState)

let rootElement = document.getElementById('root')

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={WeatherApp}/>
      <Route path="*" component={WeatherApp} />
    </Router>
  </Provider>,
  rootElement
)