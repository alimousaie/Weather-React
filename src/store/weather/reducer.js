import * as actionTypes from './actionTypes';
import { updateObject, isDayTime } from '../../shared/utility';

const initialState = {
	weathers: [],
	loading: false,
	error: null,
};

const fetchWeatherStart = (state, action) => {
	return updateObject(state, { loading: true });
};

const fetchWeatherSuccess = (state, action) => {
	const updatedWeathersList = [...state.weathers];

	let weatherStatus;
	const isDay = isDayTime(action.data.location.localtime);
	const isCold = action.data.current.temperature <= 3;
	const isCloudy =
		action.data.current.weather_descriptions[0] !== 'Sunny' &&
		action.data.current.weather_descriptions[0] !== 'Clear';

	if (!isDay) {
		weatherStatus = 'night';
	} else if (isCold && isCloudy) {
		weatherStatus = 'cold';
	} else {
		weatherStatus = 'warm';
	}

	const newItem = {
		city: action.data.location.name,
		country: action.data.location.country,
		temperature: action.data.current.temperature,
		weatherIcon: action.data.current.weather_descriptions[0],
		weatherStatus: weatherStatus,
	};

	updatedWeathersList.push(newItem);

	return updateObject(state, {
		weathers: updatedWeathersList,
		loading: false,
	});
};

const fetchWeatherFail = (state, action) => {
	return updateObject(state, {
		loading: false,
		error: action.error,
	});
};

const removeWeather = (state, action) => {
	const oldWeathersState = [...state.weathers];
	const removeItem = action.data;

	const filteredWeathers = oldWeathersState.filter((item) => {
		return item.city !== removeItem.city && item.country !== removeItem.country;
	});

	return updateObject(state, {
		weathers: filteredWeathers,
	});
};

const strategies = {
	[actionTypes.FETCH_WEATHER_START]: fetchWeatherStart,
	[actionTypes.FETCH_WEATHER_SUCCESS]: fetchWeatherSuccess,
	[actionTypes.FETCH_WEATHER_FAIL]: fetchWeatherFail,
	[actionTypes.REMOVE_WEATHER]: removeWeather,
	__default__: (state) => state,
};

const reducer = (state = initialState, action) => {
	const strategy = strategies[action.type] ?? strategies.__default__;
	return strategy(state, action);
};

export default reducer;