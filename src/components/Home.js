import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCity from './AddCity';
import CityList from './CityList';
import Filter from './Filter';
import cold from '../images/cold.png';
import hot from '../images/hot.png';
import moderate from '../images/moderate.png';
import season from '../images/season.png';
import '../style/Home.css';

const API_KEY = 'f4dcc1ff0c9c9801258e79bae8709b84';

const Home = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const cityIds = [3421319, 5880054, 2122311, 6185377, 2643743,
          1850147, 6173331, 5391959, 292223, 360630, 1609350, 2147714];
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/group?id=${cityIds.join(',')}&units=metric&appid=${API_KEY}`,
        );
        const data = await response.json();
        dispatch({ type: 'SET_CITIES', payload: data.list });
      } catch (error) {
        throw new Error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [dispatch]);

  const handleCityAdded = (newCity) => {
    dispatch({ type: 'ADD_CITY', payload: newCity });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const getWeatherImage = (temperature) => {
    if (temperature <= 10) {
      return cold;
    }
    if (temperature > 10 && temperature <= 20) {
      return moderate;
    }
    if (temperature > 20) {
      return hot;
    }
    return season;
  };

  const filteredCities = cities.filter((city) => {
    if (filter === '') return true;
    if (filter === 'cold') return city.main.temp <= 10;
    if (filter === 'moderate') return city.main.temp > 10 && city.main.temp <= 20;
    if (filter === 'hot') return city.main.temp > 20;
    return true;
  });

  return (
    <div className="container">
      <div className="title-container">
        <p className="title">Weather App</p>
      </div>
      <div className="mobile-layout">
        <div className="top-row">
          <div className="box">
            <AddCity onCityAdded={handleCityAdded} className="add-city-form" />
          </div>
          <div className="box">
            <Filter value={filter} onChange={handleFilterChange} className="filter-select" />
          </div>
        </div>
        <p className="city-text">CITIES AND THIER WEATHER.</p>
        <div className="box">
          <CityList cities={filteredCities} getWeatherImage={getWeatherImage} className="city-list" />
        </div>
      </div>
    </div>
  );
};

export default Home;
