import { getAllCities } from '../../apis/cities';
import * as actionTypes from './actionTypes';

export const fetchCitiesuccess = (cities) => {
	return {
		type: actionTypes.FETCH_CITIES_SUCCESS,
		data: cities,
	};
};

export const fetchCitiesFail = (error) => {
	return {
		type: actionTypes.FETCH_CITIES_FAIL,
		error: error,
	};
};

export const fetchCitiestart = () => {
	return {
		type: actionTypes.FETCH_CITIES_START,
	};
};

export const fetchCities = () => {
	return async (dispatch) => {
		dispatch(fetchCitiestart());

		try {
			const Cities = await getAllCities();
			dispatch(fetchCitiesuccess(Cities));
		} catch (error) {
			dispatch(fetchCitiesFail(error));
		}
	};
};

export const filterCities = (filterText) => {
	return {
		type: actionTypes.FILTER_CITIES,
		data: filterText.trim(),
	};
};

export const clearFilter = () => {
	return {
		type: actionTypes.CLEAR_FILTER,
	};
};