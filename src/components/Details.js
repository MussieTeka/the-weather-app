import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/Details.css';

const API_KEY = 'f4dcc1ff0c9c9801258e79bae8709b84';

const Details = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${API_KEY}`,
        );
        setCity(response.data);
      } catch (error) {
        throw new Error('Error fetching city data:', error);
      }
    };

    fetchCityData();
  }, [id]);

  return (
    <div className="details-container">
      <h2 className="details-header">{city ? city.name : 'Loading...'}</h2>
      {city && (
      <div className="details-box">
        <Link to="/" className="details-back-link">Back</Link>
        <p className="details-item">
          <span className="details-item-name">Temperature</span>
          <span className="details-item-value">
            {city.main.temp}
            °C
          </span>
        </p>
        <p className="details-item">
          <span className="details-item-name">Humidity</span>
          <span className="details-item-value">
            {city.main.humidity}
            %
          </span>
        </p>
        <p className="details-item">
          <span className="details-item-name">Description</span>
          <span className="details-item-value">{city.weather[0].description}</span>
        </p>
        <p className="details-item">
          <span className="details-item-name">Wind Speed</span>
          <span className="details-item-value">
            {city.wind.speed}
            {' '}
            m/s
          </span>
        </p>
        <p className="details-item">
          <span className="details-item-name">Pressure</span>
          <span className="details-item-value">
            {city.main.pressure}
            {' '}
            hPa
          </span>
        </p>
        <p className="details-item">
          <span className="details-item-name">Visibility</span>
          <span className="details-item-value">
            {city.visibility}
            {' '}
            meters
          </span>
        </p>
        <p className="details-item">
          <span className="details-item-name">Cloudiness</span>
          <span className="details-item-value">
            {city.clouds.all}
            %
          </span>
        </p>
      </div>
      )}
    </div>

  );
};

export default Details;
