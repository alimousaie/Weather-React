import * as actionTypes from './actionTypes';
import * as actions from './action';
import store, { axios } from '../../shared/test-actions-setup';

describe('Test Weather actions', () => {
	beforeEach(() => {
		store.clearActions();
	});

	it('dispatches fetchCities after a successfull get response from Api', () => {
		const resp = {
			data: [
				{
					capital: 'Stockholm',
					name: 'Sweden',
				},
				{
					capital: 'London',
					name: 'UK',
				},
				{
					capital: 'New York',
					name: 'United States of America',
				},
			],
		};

		axios.get.mockResolvedValue(resp);

		store.dispatch(actions.fetchCities()).then(() => {
			let expectedActions = [
				{ type: actionTypes.FETCH_CITIES_START },
				{
					type: actionTypes.FETCH_CITIES_SUCCESS,
					data: resp.data,
				},
			];
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});