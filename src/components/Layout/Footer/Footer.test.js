import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';

describe('<Footer/>', () => {
	it('renders the component', () => {
		render(<Footer />);
		expect(screen).toBeTruthy();
		expect(screen.getByText('© 2003-2021 Telepo AB')).toBeInTheDocument();
	});
});