import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import WeatherBox from './WeatherBox/WeatherBox';

const WeatherBoxContainer = () => {
	const selectedCitiesWeather = useSelector((state) => state.weather.weathers);

	let selectedCities = selectedCitiesWeather.map((weather) => (
		<WeatherBox key={`w-${weather.city}`} {...weather} />
	));

	return (
		<div className='row'>
			<div className='col'></div>
			<div className='col-sm-10'>
				<div className='row row-cols-2 row-cols-md-3 g-4 weather-box-container'>
					{selectedCities}
				</div>
			</div>
			<div className='col'></div>
		</div>
	);
};

export default WeatherBoxContainer;
