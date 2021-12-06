import { render, screen, fireEvent } from '../../shared/test-utils';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from './SearchBar';

const mockStore = configureStore([]);

describe('<SearchBar/>', () => {
	let store;
	const initialState = {
		location: {
			filteredCities: [
				{
					city: 'Stockholm',
					country: 'Sweden',
				},
				{
					city: 'New York',
					country: 'United States of America',
				},
			],
		},
	};

	beforeEach(() => {
		store = mockStore(initialState);
		store.dispatch = jest.fn();
		render(<SearchBar title='test' placeholder='input text' />, { store });
	});

	it('should render the component without any filters and parameters', () => {
		expect(screen).toBeTruthy();
		expect(screen.getByPlaceholderText('input text')).toBeInTheDocument();
		expect(store.dispatch).toHaveBeenCalledTimes(1);
	});

	it('should call action to filter cities upon press a key', () => {
		fireEvent.change(screen.getByPlaceholderText('input text'), {
			target: { value: 'a' },
		});

		expect(store.dispatch).toHaveBeenCalledTimes(2);
		expect(store.dispatch).toHaveBeenCalledWith({
			data: 'a',
			type: 'FILTER_CITIES',
		});
	});

	it("should call action to fetch and add new city's weather to store ", () => {
		// first select a city
		fireEvent.click(screen.getByTitle('New York'));

		// then send a request to fetch and add its weather to weathers list
		fireEvent.click(screen.getByRole('button'));

		expect(store.dispatch).toHaveBeenCalledTimes(3);
		expect(store.dispatch).toHaveBeenCalledWith({
			type: 'CLEAR_FILTER',
		});
	});
});