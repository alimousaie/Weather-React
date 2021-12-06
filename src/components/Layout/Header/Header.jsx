import React from 'react';
import './Header.css';
import logo from '../../../assets/images/logo.png';

const Header = () => {
	return (
		<header>
			<nav className='navbar'>
				<div className='container-fluid'>
					<a className='navbar-brand' href='/'>
						<img
							src={logo}
							alt=''
							height='60px'
							className='d-inline-block align-text-top'
						/>

						<span className='navbar-title'> Weather </span>
					</a>
				</div>
			</nav>
		</header>
	);
};

export default Header;