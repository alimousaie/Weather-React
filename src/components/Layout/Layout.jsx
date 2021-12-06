import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from './Main/Main';
import SearchBar from '../SearchBar/SearchBar';
import WeatherBoxContainer from '../WeatherBoxContainer/WeatherBoxContainer';

const Layout = () => {
	const addCity = (city) => {
		console.log(city);
	};
	return (
		<div className='app d-flex flex-column'>
			<Header />
			<Main>
				<SearchBar
					title="How's the weather in..."
					placeholder='Enter city name'
					onClick={addCity}
				/>
				<WeatherBoxContainer />
			</Main>
			<Footer />
		</div>
	);
};

export default Layout;