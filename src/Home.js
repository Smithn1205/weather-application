import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import searchimg from './images/search.png';
import rain from './images/rain.png';
import humidity from './images/humidity.png';
import wind from './images/wind.png';

function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setError(false); 
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b5c50c28cc0772c9e959a79f9fe0ebab&units=metric`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        if (error.response && error.response.status === 404) {
          setError(true);
        }
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
  };

  return (
    <div className='background-img'>
      <div className='container'>
        <form className='search' onSubmit={handleSubmit}>
          <input type="text" name="city" placeholder="Enter city name" />
          <button><img src={searchimg} alt="searchimg" /></button>
        </form>
        {error ? (
          <p className="error">City not found.</p>
        ) : (
          <div className='weather'>
            <img src={rain} className='weather-img' alt="searchimg" />
            <h1 className='temperature'>{weatherData && `${weatherData.main.temp}`}°C</h1>
            <h2 className='cityname'>{weatherData && `${weatherData.name}`}</h2>
            <div className='data'>
              <div className='col'>
                <img src={humidity} alt='humidity'/>
                <div>
                  <p className='humidity'>{weatherData && `${weatherData.main.humidity}`}%</p>
                  <p className='title'>Humidity</p>
                </div>
              </div>
              <div className='col'>
                <img src={wind} alt='wind'/>
                <div>
                  <p className='wind'>{weatherData && `${weatherData.wind.speed}`}m/s</p>
                  <p className='title'>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
