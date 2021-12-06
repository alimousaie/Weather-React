import { render, screen, fireEvent } from '../../../shared/test-utils';
import configureStore from 'redux-mock-store';
import WeatherBox from './WeatherBox';
import { removeWeather } from '../../../store/weather/action';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('<WeatherBox/>', () => {
	let store;

	beforeEach(() => {
		store = mockStore({});
		store.dispatch = jest.fn();
		render(
			<WeatherBox
				city='Stockholm'
				country='Sweden'
				temperature='-8'
				weatherIcon='Light Snow'
				weatherStatus='cold'
			/>,
			{ store }
		);
	});

	it('should render with given props store', () => {
		expect(screen).toBeTruthy();
		expect(screen.getByText(/Stockholm/)).toBeInTheDocument();
		expect(screen.getByText(/Sweden/)).toBeInTheDocument();
		expect(screen.getByText(/-8/)).toBeInTheDocument();
	});

	it('should dispatch an action on button click', async () => {
		fireEvent.click(screen.getByTitle('Close'));

		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalledWith(
			removeWeather('Stockholm', 'Sweden')
		);
	});
});