import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../style/Details.css';

const API_KEY = 'f4dcc1ff0c9c9801258e79bae8709b84';

const Details = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${API_KEY}`,
        );

        if (response.ok) {
          const data = await response.json();
          setCity(data);
        } else {
          throw new Error('Error fetching city data:', response.statusText);
        }
      } catch (error) {
        setError('Error fetching city data');
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {' '}
        {error}
      </div>
    );
  }

  return (
    <div className="details-container">
      <h2 className="details-header">{city ? city.name : 'City not found'}</h2>
      {city && (
        <div className="details-box">
          <Link to="/" className="details-back-link">
            Back
          </Link>
          <p className="details-item">
            <span className="details-item-name">Temperature</span>
            <span className="details-item-value">
              {city.main.temp}
              {' '}
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
            <span className="details-item-value">
              {city.weather[0].description}
            </span>
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
          <p className="details-item">
            <span className="details-item-name">Sunrise</span>
            <span className="details-item-value">
              {new Date(city.sys.sunrise * 1000).toLocaleTimeString()}
            </span>
          </p>
          <p className="details-item">
            <span className="details-item-name">Sunset</span>
            <span className="details-item-value">
              {new Date(city.sys.sunset * 1000).toLocaleTimeString()}
            </span>
          </p>
          <p className="details-item">
            <span className="details-item-name">Geo Coordinates</span>
            <span className="details-item-value">
              Lat:
              {' '}
              {city.coord.lat}
              , Lon:
              {' '}
              {city.coord.lon}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Details;
