import React, { Component, PropTypes } from 'react'
import { Link, DefaultRoute, RouteHandler, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { fetchConditions } from '../actions'
import '../styles/weatherapp.less'

class WeatherApp extends Component {

  /**
   * weatherapp component constructor.
   *
   * @param the properties of this component
   */
  constructor (props) {
    super(props)
    this.state = {
      cities: [],
      updateComponent: true
    }
  }

  /**
   * only update component when all (ten!!!) api calls have been made, and the data has been sorted
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.updateComponent === false) {
      return false
    } else {
      return true
    }
  }

  /**
   * prepare for api calls and sorting before loading the component in the DOM
   */
  componentWillMount() {
    const { dispatch } = this.props

    let fetchAustinConditions = Promise.resolve(dispatch(fetchConditions('TX', 'Austin'))).then(() => {
      this.tabulateConditions()
    })
    let fetchDenverConditions = Promise.resolve(dispatch(fetchConditions('CO', 'Denver'))).then(() => {
      this.tabulateConditions()
    })
    let fetchSanJoseConditions = Promise.resolve(dispatch(fetchConditions('CA', 'San_Jose'))).then(() => {
      this.tabulateConditions()
    })
    let fetchWashingtonConditions = Promise.resolve(dispatch(fetchConditions('DC', 'Washington'))).then(() => {
        this.tabulateConditions()
    })
    let fetchFayettevilleConditions = Promise.resolve(dispatch(fetchConditions('AR', 'Fayetteville'))).then(() => {
      this.tabulateConditions()
    })
    let fetchSeattleConditions = Promise.resolve(dispatch(fetchConditions('WA', 'Seattle'))).then(() => {
      this.tabulateConditions()
    })
    let fetchRaleighConditions = Promise.resolve(dispatch(fetchConditions('NC', 'Raleigh'))).then(() => {
      this.tabulateConditions()
    })
    let fetchBostonConditions = Promise.resolve(dispatch(fetchConditions('MA', 'Boston'))).then(() => {
      this.tabulateConditions()
    })
    let fetchDesMoinesConditions = Promise.resolve(dispatch(fetchConditions('IA', 'Des_Moines'))).then(() => {
      this.tabulateConditions()
    })
    let fetchSaltLakeCityConditions = Promise.resolve(dispatch(fetchConditions('UT', 'Salt_Lake_City'))).then(() => {
      this.tabulateConditions()
    })

    this.setState({updateComponent: false})
    Promise.all([fetchAustinConditions, fetchDenverConditions, fetchSanJoseConditions,
      fetchWashingtonConditions, fetchFayettevilleConditions, fetchSeattleConditions, fetchRaleighConditions,
      fetchBostonConditions, fetchDesMoinesConditions, fetchSaltLakeCityConditions]).then(() => {
      this.sortWeatherData()
    })
  }

  /**
   * add a city's weather conditions to the COMPONENT state
   */
  tabulateConditions() {

    if (Object.keys(this.props.conditions).length > 0) {
      let citiesArray = this.state.cities
      citiesArray.push(this.props.conditions)
      this.setState({cities : citiesArray})
    }
  }

  /**
   * sort the gives cities weather conditions by temperature, descending
   */
  sortWeatherData() {

    let unsortedCities = this.state.cities
    let sortedCities = unsortedCities.sort( (firstCity, secondCity) => {
      return (secondCity.temp_f - firstCity.temp_f)
    })
    this.setState({updateComponent: true})
    this.setState({cities: sortedCities})
  }

  /**
   * render the DOM
   */
  render() {
    if (this.state.cities.length > 0) {
      return(
        <div className="weatherapp">
          <div className="weatherapp-header">Weather App</div>
          <div className="weatherapp-grid">
            <div className="header-row">
              <div className="city-header">City</div>
              <div className="temp-f-header">Temp (F)</div>
              <div className="temp-c-header">Temp (C)</div>
            </div>
            {
              this.state.cities.map((city, i) => {
                return (
                  <div className="temp-row" key={i}>
                    <div className="city-name">{city.display_location.city}</div>
                    <div className="temp-f">{city.temp_f}</div>
                    <div className="temp-c">{city.temp_c}</div>
                  </div>
                )
              })
            }
          </div>
        </div>)
    } else {
      return(<div className="weatherapp"><h1 className="weatherapp-header">WeatherApp</h1></div>)
    }
  }
}

/**
 * the action dispatcher
 */
WeatherApp.propTypes = {
  dispatch: PropTypes.func.isRequired
}

/**
 * map to this component's properties the parts of the app state it should be concerned with
 *
 * @param    the application state
 * @returns  the part of the state which will be mapped to this component's properties
 */
function mapStateToProps(state) {
  const { getConditions } = state
  const { conditions, getConditionsError } = getConditions

  return {
    conditions,
    getConditionsError
  }
}

export default connect(mapStateToProps)(WeatherApp)

