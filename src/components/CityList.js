import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/CityList.css';

const CityList = ({ cities, getWeatherImage }) => (
  <div className="city-list-container">
    {cities.map((city) => (
      <div key={city.id} className="city-box">
        <img src={getWeatherImage(city.main.temp)} alt="Weather" className="weather-image" />
        <Link to={`/details/${city.id}`} className="city-link">
          {city.name}
        </Link>
        <p className="city-temperature">
          {city.main.temp}
          °C
        </p>
      </div>
    ))}
  </div>
);

CityList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  getWeatherImage: PropTypes.func.isRequired,
};

export default CityList;
