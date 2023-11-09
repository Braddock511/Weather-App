import React, { Component } from 'react';
import Form from './Search';
import Result from './WeatherrData';


class App extends Component {

  state = {
    value: "",
    city: "",
    date: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    err: "",
    lat: "",
    lon: ""
  };

  InputChagne = (e) => {
    this.setState({
      value: e.target.value
    });
  };

  FetchAPI = (API) => {
    fetch(API)
    .then(response => {
      if(response.ok){
        return response;
      }
    })
    .then(response => response.json())
    .then(data => {
      const current_date = new Date().toLocaleDateString();
      let city_name = data.name.includes("Voivodeship") ? data.name.replace("Voivodeship", "") : data.name;
      
      this.setState({
        city: city_name,
        date: current_date,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        pressure: data.main.pressure,
        wind: data.wind,
        err: false
      });
    })
    .catch(error => {
      this.setState({
        err: true,
        city: this.state.value
      });
    });
  }

  CitySubmit = (e) => {
    e.preventDefault();
    const city_api = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

    this.FetchAPI(city_api)
  }
    
  UserCity = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const user_lat = position.coords.latitude;
        const user_lon = position.coords.longitude;
        this.setState({
          lat: user_lat,
          lon: user_lon
        }, () => {
          const your_city_api = `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&APPID=${APIKey}&units=metric`;
          this.FetchAPI(your_city_api);
        })
      },
    )
  }

  render(){
    return (
      <div className="App">
        <header>
          <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="rgb(50, 170, 254)" className="bi bi-cloud-sun-fill" viewBox="0 0 16 16">
            <path d="M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"/>
            <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
          </svg>
        <h1>Weather application</h1>
        </header>
        <Form value={this.state.value} change={this.InputChagne} submit={this.CitySubmit} your_city={this.UserCity}/>
        <Result weather={this.state}/>   
      </div>
    )
  }
}
const APIKey = "856162d6262324c81cb0351ae6dd0abe";

export default App