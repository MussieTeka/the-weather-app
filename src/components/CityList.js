import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/CityList.css';
import right from '../images/right.png';

const CityList = ({ cities, getWeatherImage }) => (
  <div className="city-list-container">
    {cities.map((city) => (
      <Link to={`/details/${city.id}`} key={city.id} className="city-box">
        <div className="city-top">
          <img src={getWeatherImage(city.main.temp)} alt="Weather" className="weather-image" />
          <img src={right} alt="Right Arrow" className="right-arrow" />
        </div>
        <p className="city-link">
          {city.name}
        </p>
        <p className="city-temperature">
          {city.main.temp}
          °C
        </p>
      </Link>
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
