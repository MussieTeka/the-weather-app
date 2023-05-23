import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AddCity from './AddCity';
import CityList from './CityList';
import Filter from './Filter';

const API_KEY = 'f4dcc1ff0c9c9801258e79bae8709b84';

const Home = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const cityIds = [524901, 703448, 1283240, 2643743, 3169070, 1835848, 1701668, 745044];
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/group?id=${cityIds.join(',')}&units=metric&appid=${API_KEY}`,
        );
        dispatch({ type: 'SET_CITIES', payload: response.data.list });
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

  const filteredCities = cities.filter((city) => {
    if (filter === '') return true;
    if (filter === 'cold') return city.main.temp <= 10;
    if (filter === 'moderate') return city.main.temp > 10 && city.main.temp <= 20;
    if (filter === 'hot') return city.main.temp > 20;
    return true;
  });

  return (
    <div>
      <h1>Weather App</h1>
      <AddCity onCityAdded={handleCityAdded} />
      <Filter value={filter} onChange={handleFilterChange} />
      <CityList cities={filteredCities} />
    </div>
  );
};

export default Home;