import axios from 'axios';
import { userConfig } from '../config/config';

export const getAllCities = async () => {
	try {
		const response = await axios.get(userConfig.cities_api_url);
		return response.data.data;
	} catch (error) {
		return error;
	}
};