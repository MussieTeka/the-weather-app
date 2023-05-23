import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CityList = ({ cities }) => (
  <ul>
    {cities.map((city) => (
      <li key={city.id}>
        <Link to={`/details/${city.id}`}>{city.name}</Link>
        <p>
          Temperature:
          {city.main.temp}
          °C
        </p>
      </li>
    ))}
  </ul>
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
};

export default CityList;
