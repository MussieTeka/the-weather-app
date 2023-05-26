import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCity from './AddCity';
import CityList from './CityList';
import Filter from './Filter';
import '../style/Home.css';

const API_KEY = 'f4dcc1ff0c9c9801258e79bae8709b84';

const Home = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const cityIds = [524901, 703448, 1283240, 2643743, 3169070, 1835848, 1701668, 745044];
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/group?id=${cityIds.join(',')}&units=metric&appid=${API_KEY}`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        dispatch({ type: 'SET_CITIES', payload: data.list });
      } catch (error) {
        setError('Error fetching weather data');
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

  const filteredCities = cities.filter((city) => {
    if (filter === '') return true;
    if (filter === 'cold') return city.main.temp <= 10;
    if (filter === 'moderate') return city.main.temp > 10 && city.main.temp <= 20;
    if (filter === 'hot') return city.main.temp > 20;
    return true;
  });

  return (
    <div className="container">
      <h1>Weather App</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="mobile-layout">
        <div className="top-row">
          <div className="box">
            <AddCity onCityAdded={handleCityAdded} className="add-city-form" />
          </div>
          <div className="box">
            <Filter value={filter} onChange={handleFilterChange} className="filter-select" />
          </div>
        </div>
        <div className="box">
          <CityList cities={filteredCities} className="city-list" />
        </div>
      </div>
    </div>
  );
};

export default Home;
