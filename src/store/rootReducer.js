import { reducer as locationReducer } from './location';
import { reducer as weatherReducer } from './weather';

export default function combineReducers(state = {}, action) {
	return {
		location: locationReducer(state.location, action),
		weather: weatherReducer(state.weather, action),
	};
}
