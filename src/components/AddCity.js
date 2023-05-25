import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../style/AddCity.css';

const API_KEY = 'f4dcc1ff0c9c9801258e79bae8709b84';

const AddCity = ({ onCityAdded }) => {
  const [cityName, setCityName] = useState('');

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);
  };

  const handleAddCity = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`,
      );

      if (response.ok) {
        const data = await response.json();
        onCityAdded(data);
        setCityName('');
      } else {
        throw new Error('Error adding city:', response.statusText);
      }
    } catch (error) {
      throw new Error('Error adding city:', error);
    }
  };

  return (
    <div className="add-city-container">
      <input
        className="add-city-input"
        type="text"
        placeholder="Enter city name"
        value={cityName}
        onChange={handleCityNameChange}
      />
      <button className="add-city-button" type="button" onClick={handleAddCity}>
        Add
      </button>
    </div>
  );
};

AddCity.propTypes = {
  onCityAdded: PropTypes.func.isRequired,
};

export default AddCity;
