import React from 'react';
import './Main.css';

const Main = ({ children }) => {
	return (
		<main className='main flex-shrink-0 d-flex justify-content-center align-items-center'>
			<div className='container'>{children}</div>
		</main>
	);
};

export default Main;