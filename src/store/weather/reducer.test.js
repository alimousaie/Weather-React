import reducer from './reducer';
import * as actionTypes from './actionTypes';

describe('weathers reducer test', () => {
	const initialState = {
		weathers: [],
		loading: false,
		error: null,
	};

	it('should return the initial state', () => {
		const nextState = reducer(undefined, {});

		expect(nextState).toEqual({
			weathers: [],
			loading: false,
			error: null,
		});
	});

	it('should store the weathers upon fetch completed successfully', () => {
		const action = {
			type: actionTypes.FETCH_WEATHER_SUCCESS,
			data: {
				location: {
					name: 'New York',
					country: 'United States of America',
					localtime: '2019-09-07 08:14',
				},
				current: {
					temperature: 13,
					weather_descriptions: ['Sunny'],
				},
			},
		};

		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			weathers: [
				{
					city: 'New York',
					country: 'United States of America',
					temperature: 13,
					weatherIcon: 'Sunny',
					weatherStatus: 'warm',
				},
			],
			loading: false,
			error: null,
		});
	});

	it('should store the weathers upon fetch failed', () => {
		const action = {
			type: actionTypes.FETCH_WEATHER_FAIL,
			error: 'error',
		};

		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			weathers: [],
			loading: false,
			error: 'error',
		});
	});

	it('should remove selected weather from store ', () => {
		const action = {
			type: actionTypes.REMOVE_WEATHER,
			data: { city: 'Stockholm', country: 'Sweden' },
		};

		const lastState = {
			...initialState,
			weathers: [
				{ city: 'Stockholm', country: 'Sweden' },
				{ city: 'London', country: 'UK' },
				{ city: 'Washington DC', country: 'US' },
			],
		};
		const nextState = reducer(lastState, action);

		expect(nextState).toEqual({
			weathers: [
				{ city: 'London', country: 'UK' },
				{ city: 'Washington DC', country: 'US' },
			],
			loading: false,
			error: null,
		});
	});
});