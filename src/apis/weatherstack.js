import axios from 'axios';
import { userConfig } from '../config/config';

export const getWeather = async (city) => {
	const params = {
		access_key: userConfig.weather_api_key,
		query: city,
	};

	try {
		const response = await axios.get(userConfig.weather_api_url, { params });
		return response;
	} catch (error) {
		return error;
	}
};