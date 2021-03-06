import React from 'react';
import moment from 'moment';

const DayCard = ({data, degreeType, windSpeed, windSpeedNum}) => {
    const {temp, dt, imgId, desc, feelsLike, humidity} = data

    const newDate = new Date()
    newDate.setTime(dt * 1000)

    const icon = `owf owf-${imgId} owf-5x`

    const fahrenheit = Math.round(temp)
    const celsius = Math.round((fahrenheit - 32) * (5 / 9))

    const mph = windSpeedNum
    const kph = Math.round(mph * 1.60934)
    console.log(kph)

    return (
        <div className='col-sm-2'>
            <div className='card'>
                <h3 className='card-title'>{moment(newDate).format('dddd')}</h3>
                <p className='text-muted'>{moment(newDate).format('MMMM Do, h:mm a')}</p>
                <p className='text-muted'>Feels like <br />{feelsLike}</p>
                <p className='text-muted'>Humidity <br />{humidity}</p>
                <p className='text-muted'>Wind Speed <br />{windSpeed === 'mph' ? `MPH: ${mph}` : `KPH: ${kph}`}</p>
                <i className={icon} />
                <h2>{degreeType === 'celsius' ? `${celsius} ℃` : `${fahrenheit} ℉`}</h2>
                <div className='card-body'>
                    <p className='card-text'>{desc}</p>
                </div>
            </div>
        </div>
        )
    }

export default DayCard