import React from 'react';
import './Main.css';

const Main = ({ children }) => {
	return (
		<main className='main flex-shrink-0 d-flex justify-content-center align-items-center py-3'>
			<div className='container-fluid'>{children}</div>
		</main>
	);
};

export default Main;
