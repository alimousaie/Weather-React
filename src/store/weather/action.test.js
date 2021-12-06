import * as actionTypes from './actionTypes';
import * as actions from './action';
import store, { axios } from '../../shared/test-actions-setup';

describe('Test Weather actions', () => {
	beforeEach(() => {
		store.clearActions();
	});

	it('dispatches fetchWeather after a successfull get response from Api', () => {
		const resp = {
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

		axios.get.mockResolvedValue(resp);

		store.dispatch(actions.fetchWeather('New York')).then(() => {
			let expectedActions = [
				{ type: actionTypes.FETCH_WEATHER_START },
				{
					type: actionTypes.FETCH_WEATHER_SUCCESS,
					data: resp.data,
				},
			];
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});