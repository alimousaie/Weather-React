import { render, screen, fireEvent } from '../../../shared/test-utils';
import configureStore from 'redux-mock-store';
import SearchReslt from './SearchReslt';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('<SearchReslt/>', () => {
	let onSelectHandler;
	let store;

	beforeEach(() => {
		onSelectHandler = jest.fn();
		store = mockStore({});
		store.dispatch = jest.fn();
	});

	it('should render the component without any seleced weathers', () => {
		const initialState = {
			location: {
				filteredCities: [],
			},
		};

		render(<SearchReslt onSelectItem={onSelectHandler} />, {
			initialState: initialState,
		});
		expect(screen).toBeTruthy();
	});

	it('should render with given state from Redux store', () => {
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

		render(<SearchReslt onSelectItem={onSelectHandler} />, {
			initialState: initialState,
		});

		expect(screen).toBeTruthy();
		expect(screen.getByTitle('Stockholm')).toBeInTheDocument();
		expect(screen.getByTitle('New York')).toBeInTheDocument();

		fireEvent.click(screen.getByTitle('Stockholm'));

		expect(onSelectHandler).toHaveBeenCalledTimes(1);
		expect(onSelectHandler).toHaveBeenCalledWith({
			city: 'Stockholm',
			country: 'Sweden',
		});
	});
});