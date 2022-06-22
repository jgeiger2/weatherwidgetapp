import React from 'react';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';
import {WEATHER_API, WEATHER_URL} from '../constants'
import WeatherService from '../services';

const weather = new WeatherService()
class ForecastContainer extends React.Component {
    state = {
        data: [],
        loading: false,
        error: false,
        degreeType: 'fahrenheit',
        windSpeed: 'mph',
    }

    componentDidMount() {
        this.setState(({loading: true}))
        weather.fetchFiveDayForecast().then((res) => {
            if (res && res.response.ok) {
                this.setState({
                    data: res.data,
                    loading: false,
                })
            }else {
                this.setState({loading: false})
            }
        }, (error) => {
            this.setState(({
                loading: false,
                error: true,
            }))
        })
    }

    updateForecastDegree = ({target: {value}}) =>
    this.setState({degreeType: value})
    
    updateWindSpeed = ({target: {value}}) =>
    this.setState({windSpeed: value})

    render() {
        const {loading, error, data, degreeType, windSpeed} = this.state
        return (
            <div className='container mt-5'>
                <h1 className='display-1 jumbotron bg-secondary py-5 nb-5'>5-Day Forecast</h1>
                <h5 className='text-muted'>Lutz, FL, USA</h5>
                <DegreeToggle degreeType={degreeType} updateForecastDegree={this.updateForecastDegree} updateWindSpeed={this.updateWindSpeed}/>
                <div className='row justify-content-center'>
                {!loading ? data.map((item, index) => (
                    <DayCard 
                        data={item} 
                        key={item.dt}
                        degreeType={degreeType}
                        windSpeed={windSpeed}
                        windSpeedNum={this.state.data[index].windSpeed}
                        />
                )) : <div>Loading...</div>}
                </div>
                {error && <h3 className='text-danger'>Error loading data 🥺</h3>}
            </div>
        )
    }
}

export default ForecastContainer