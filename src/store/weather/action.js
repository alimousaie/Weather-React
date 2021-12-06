import { getWeather } from '../../apis/weatherstack';
import * as actionTypes from './actionTypes';

export const fetchWeatheruccess = (weather) => {
	return {
		type: actionTypes.FETCH_WEATHER_SUCCESS,
		data: weather,
	};
};

export const fetchWeatherFail = (error) => {
	return {
		type: actionTypes.FETCH_WEATHER_FAIL,
		error: error,
	};
};

export const fetchWeathertart = () => {
	return {
		type: actionTypes.FETCH_WEATHER_START,
	};
};

export const fetchWeather = (city) => {
	return async (dispatch) => {
		dispatch(fetchWeathertart());

		try {
			const weather = await getWeather(city);
			dispatch(fetchWeatheruccess(weather.data));
		} catch (error) {
			dispatch(fetchWeatherFail(error));
		}
	};
};

export const removeWeather = (city, country) => {
	return {
		type: actionTypes.REMOVE_WEATHER,
		data: { city, country },
	};
};