import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h2>{city ? city.name : 'Loading...'}</h2>
      {city && (
        <div>
          <Link to="/">Back</Link>
          <p>
            Temperature:
            {' '}
            {city.main.temp}
            °C
          </p>
          <p>
            Humidity:
            {' '}
            {city.main.humidity}
            %
          </p>
          <p>
            Description:
            {' '}
            {city.weather[0].description}
          </p>
          <p>
            Wind Speed:
            {' '}
            {city.wind.speed}
            {' '}
            m/s
          </p>
          <p>
            Pressure:
            {' '}
            {city.main.pressure}
            {' '}
            hPa
          </p>
          <p>
            Visibility:
            {' '}
            {city.visibility}
            {' '}
            meters
          </p>
          <p>
            Cloudiness:
            {' '}
            {city.clouds.all}
            %
          </p>
        </div>
      )}
    </div>
  );
};

export default Details;
