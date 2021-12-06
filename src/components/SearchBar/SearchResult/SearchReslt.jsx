import React from 'react';
import { useSelector } from 'react-redux';

const SearchReslt = ({ onSelectItem }) => {
	const filteredCities = useSelector((state) => state.location.filteredCities);

	const filteredCitiesMaped = filteredCities.map((item) => {
		return (
			<li
				key={`${item.country.replace(' ', '-')}-${item.city}`}
				className='list-group-item list-group-item-action'
				title={item.city}
				onClick={() => onSelectItem(item)}
			>
				{item.city}, <span className='text-muted'>{item.country}</span>
			</li>
		);
	});

	return (
		<div className='search-result'>
			<ul className='list-group'>{filteredCitiesMaped}</ul>
		</div>
	);
};

export default SearchReslt;