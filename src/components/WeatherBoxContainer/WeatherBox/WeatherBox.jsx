import React from 'react';
import { useDispatch } from 'react-redux';
import { weatherActions } from '../../../store';
import './WeatherBox.css';

export const WeatherBox = ({
	city,
	country,
	temperature,
	weatherIcon,
	weatherStatus,
}) => {
	const dispatch = useDispatch();
	const closeHandler = () => {
		dispatch(weatherActions.removeWeather(city, country));
	};

	return (
		<div className='col'>
			<div
				className={`card weather-box position-relative mb-3 ${weatherStatus}`}
			>
				<span
					onClick={closeHandler}
					className='close-button position-absolute'
					title='Close'
				>
					X
				</span>
				<div className='row g-0'>
					<div className='col-4'>
						<i
							className='weather-icon'
							data-icon={weatherIcon}
							title={weatherIcon}
						></i>
					</div>
					<div className='col-8'>
						<div className='card-body'>
							<h3 className='card-title text-center position-relative centigrad-badge'>
								{temperature}
							</h3>
							<p className='card-text text-center text-truncate'>
								{city}, {country}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherBox;