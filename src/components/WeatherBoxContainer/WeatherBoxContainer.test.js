import { render, screen } from '../../shared/test-utils';
import '@testing-library/jest-dom/extend-expect';
import WeatherBoxContainer from './WeatherBoxContainer';

describe('<WeatherBoxContainer/>', () => {
	it('should render the component without any seleced weathers', () => {
		const initialState = {
			weather: {
				weathers: [],
			},
		};

		render(<WeatherBoxContainer />, { initialState: initialState });
		expect(screen).toBeTruthy();
	});

	it('should render with given state from Redux store', () => {
		const initialState = {
			weather: {
				weathers: [
					{
						city: 'Stockholm',
						country: 'Sweden',
						temperature: -8,
						weatherIcon: 'Snowy',
						weatherStatus: 'cold',
					},
					{
						city: 'New York',
						country: 'United States of America',
						temperature: 13,
						weatherIcon: 'Sunny',
						weatherStatus: 'warm',
					},
				],
			},
		};

		render(<WeatherBoxContainer />, {
			initialState: initialState,
		});

		expect(screen).toBeTruthy();
		expect(screen.getByText('Stockholm, Sweden')).toBeInTheDocument();
		expect(screen.getByText('-8')).toBeInTheDocument();
		expect(screen.getByTitle('Snowy')).toBeInTheDocument();

		expect(
			screen.getByText('New York, United States of America')
		).toBeInTheDocument();
		expect(screen.getByText('13')).toBeInTheDocument();
		expect(screen.getByTitle('Sunny')).toBeInTheDocument();
	});
});