import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { locationActions, weatherActions } from '../../store';

import { ReactComponent as LocationIcon } from '../../assets/images/location.svg';
import './SearchBar.css';
import SearchReslt from './SearchResult/SearchReslt';

const SearchBar = ({ title, placeholder }) => {
	const [filterText, setFilterText] = useState('');
	const [selectedItem, setSelectedItem] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(locationActions.fetchCities());
	}, []);

	const changeHandler = (event) => {
		const filterWord = event.target.value.trim();
		if (filterWord.length === 0) {
			setSelectedItem(null);
		}

		setFilterText(filterWord);
		dispatch(locationActions.filterCities(filterWord));
	};

	const addHandler = () => {
		if (selectedItem === null) return;
		dispatch(weatherActions.fetchWeather(selectedItem.city));
		setFilterText('');
	};

	const handleSelectCity = (item) => {
		setSelectedItem(item);
		setFilterText(`${item.city},${item.country}`);
		dispatch(locationActions.clearFilter());
	};

	return (
		<>
			<div className='row'>
				<div className='col'></div>
				<div className='col-sm-8'>
					<h4 className='search-title text-center mb-3'>{title}</h4>
				</div>
				<div className='col'></div>
			</div>
			<div className='row mb-5'>
				<div className='col'></div>
				<div className='col-sm-8 d-flex justify-content-center px-4 position-relative'>
					<div className='search-box mb-3'>
						<div className='input-group'>
							<span className='input-group-text'>
								<LocationIcon />
							</span>
							<input
								type='text'
								className='form-control'
								placeholder={placeholder}
								aria-label='city'
								value={filterText}
								onChange={changeHandler}
							/>
							<button
								type='button'
								className='btn text-white'
								onClick={addHandler}
							>
								+
							</button>
						</div>

						<SearchReslt onSelectItem={handleSelectCity} />
					</div>
				</div>
				<div className='col'></div>
			</div>
		</>
	);
};

export default SearchBar;
