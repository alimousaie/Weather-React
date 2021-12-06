import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

describe('<Header/>', () => {
	it('renders the component', () => {
		render(<Header />);
		expect(screen).toBeTruthy();
		expect(screen.getByText('Weather')).toBeInTheDocument();
	});
});