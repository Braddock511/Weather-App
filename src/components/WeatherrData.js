import React from "react";

const Result = props => {
    const {city, date, sunrise, sunset, temp, pressure, wind, err} = props.weather;
    let content = null;

    if(!err && city){
        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
        content = (
            <div id="data">
                <h1>Weather in {city} ({date})</h1>
                <div className="data-block">Temparture: {temp} &#176;C</div>
                <div className="data-block">Sunrise: {sunriseTime}</div>
                <div className="data-block">Sunset: {sunsetTime}</div>
                <div className="data-block">Pressure: {pressure} hPa</div>
                <div className="data-block">Wind speed: {wind.speed} m/s</div>
            </div>
        );
    }

    return (
        <div className="result">
            <div id="error">
                <h1>{err ? `We don't have ${city} in the database` : content} </h1>
            </div>
            
        </div>
    )
}

export default Result