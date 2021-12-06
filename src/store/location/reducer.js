import * as actionTypes from './actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	cities: [],
	filteredCities: [],
	loading: false,
	error: null,
};

const fetchCitiesStart = (state, action) => {
	return updateObject(state, { loading: true });
};

const fetchCitiesSuccess = (state, action) => {
	let mapedCities = action.data.map((item) => {
		return { city: item.capital, country: item.name };
	});

	mapedCities = mapedCities.sort((item1, item2) =>
		item1.city.localeCompare(item2.city)
	);

	return updateObject(state, {
		cities: mapedCities,
		loading: false,
	});
};

const fetchCitiesFail = (state, action) => {
	return updateObject(state, {
		loading: false,
		error: action.error,
	});
};

const filterCities = (state, action) => {
	const cities = [...state.cities];
	const filterText = action.data.toLowerCase();

	let filteredCities;

	if (filterText.length > 0) {
		filteredCities = cities.filter((item) => {
			return item.city.toLowerCase().includes(filterText);
		});
	} else {
		filteredCities = [];
	}

	return updateObject(state, {
		filteredCities,
	});
};

const clearFilter = (state, action) => {
	return updateObject(state, {
		filteredCities: [],
	});
};

const strategies = {
	[actionTypes.FETCH_CITIES_START]: fetchCitiesStart,
	[actionTypes.FETCH_CITIES_SUCCESS]: fetchCitiesSuccess,
	[actionTypes.FETCH_CITIES_FAIL]: fetchCitiesFail,
	[actionTypes.FILTER_CITIES]: filterCities,
	[actionTypes.CLEAR_FILTER]: clearFilter,
	__default__: (state) => state,
};

const reducer = (state = initialState, action) => {
	const strategy = strategies[action.type] ?? strategies.__default__;
	return strategy(state, action);
};

export default reducer;