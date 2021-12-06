import reducer from './reducer';
import * as actionTypes from './actionTypes';

describe('location reducer test', () => {
	const initialState = {
		cities: [],
		filteredCities: [],
		loading: false,
		error: null,
	};

	it('should return the initial state', () => {
		const nextState = reducer(undefined, {});

		expect(nextState).toEqual({
			cities: [],
			filteredCities: [],
			loading: false,
			error: null,
		});
	});

	it('should store the cities upon fetch completed successfully', () => {
		const action = {
			type: actionTypes.FETCH_CITIES_SUCCESS,
			data: [
				{ capital: 'Stockholm', name: 'Sweden' },
				{ capital: 'London', name: 'UK' },
				{ capital: 'Washington DC', name: 'US' },
				{ capital: 'Tokyo', name: 'Japan' },
			],
		};

		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			cities: [
				{ city: 'London', country: 'UK' },
				{ city: 'Stockholm', country: 'Sweden' },
				{ city: 'Tokyo', country: 'Japan' },
				{ city: 'Washington DC', country: 'US' },
			],
			filteredCities: [],
			loading: false,
			error: null,
		});
	});

	it('should store the error upon fetch failed', () => {
		const action = {
			type: actionTypes.FETCH_CITIES_FAIL,
			error: 'error',
		};

		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			cities: [],
			filteredCities: [],
			loading: false,
			error: 'error',
		});
	});

	it('should store the filtered cities', () => {
		const action = {
			type: actionTypes.FILTER_CITIES,
			data: 'to',
		};

		const lastState = {
			...initialState,
			cities: [
				{ city: 'London', country: 'UK' },
				{ city: 'Stockholm', country: 'Sweden' },
				{ city: 'Tokyo', country: 'Japan' },
				{ city: 'Washington DC', country: 'US' },
			],
		};
		const nextState = reducer(lastState, action);

		expect(nextState).toEqual({
			cities: [
				{ city: 'London', country: 'UK' },
				{ city: 'Stockholm', country: 'Sweden' },
				{ city: 'Tokyo', country: 'Japan' },
				{ city: 'Washington DC', country: 'US' },
			],
			filteredCities: [
				{ city: 'Stockholm', country: 'Sweden' },
				{ city: 'Tokyo', country: 'Japan' },
				{ city: 'Washington DC', country: 'US' },
			],
			loading: false,
			error: null,
		});
	});

	it('should clear filtered cities', () => {
		const action = {
			type: actionTypes.CLEAR_FILTER,
		};

		const lastState = {
			...initialState,
			cities: [
				{ city: 'London', country: 'UK' },
				{ city: 'Stockholm', country: 'Sweden' },
				{ city: 'Tokyo', country: 'Japan' },
				{ city: 'Washington DC', country: 'US' },
			],
			filteredCities: [
				{ city: 'London', country: 'UK' },
				{ city: 'Washington DC', country: 'US' },
			],
		};
		const nextState = reducer(lastState, action);

		expect(nextState).toEqual({
			cities: [
				{ city: 'London', country: 'UK' },
				{ city: 'Stockholm', country: 'Sweden' },
				{ city: 'Tokyo', country: 'Japan' },
				{ city: 'Washington DC', country: 'US' },
			],
			filteredCities: [],
			loading: false,
			error: null,
		});
	});
});