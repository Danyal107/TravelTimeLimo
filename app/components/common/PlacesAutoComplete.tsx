import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { globalStateController } from '@/state/global/globalStateController';

const GoMapsAutocomplete = ({ placeholder, distination }) => {
	const [query, setQuery] = useState('');
	const [suggestions, setSuggestions] = useState([]);

	const { stepperValues } = globalStateController.useState(['stepperForm'], 'stepperValues');
	const bookingInfo = stepperValues?.stepperForm?.bookingInfo;

	// Function to fetch suggestions
	const fetchSuggestions = async input => {
		try {
			const response = await axios.get('https://maps.gomaps.pro/maps/api/place/autocomplete/json', {
				params: {
					key: process.env.NEXT_PUBLIC_GOMAPS_PLACES_API_KEY, // Replace with your API key
					input, // User's input
					components: 'country:us', // Restrict to a specific country (optional)
					strictbounds: true, // return places strictly within the region defined by location and radius
					location: '40.730610,-73.935242', // restrict location to new york
					radius: 50000, // Radius in meters (e.g., 50 km / 31 miles around NYC)
				},
			});

			// Filter already selected suggestions
			let predictions = response.data.predictions || [];
			if (bookingInfo?.from) {
				predictions = predictions.filter(
					suggestion => suggestion.description.toLowerCase() !== bookingInfo.from.toLowerCase()
				);
			} else if (bookingInfo?.to) {
				predictions = predictions.filter(
					suggestion => suggestion.description.toLowerCase() !== bookingInfo.to.toLowerCase()
				);
			}
			setSuggestions(predictions);
		} catch (error) {
			console.error('Error fetching suggestions:', error);
		}
	};

	const clearInput = () => {
		setQuery('');
		setSuggestions([]);
		globalStateController.updateState({
			stepperForm: {
				...stepperValues?.stepperForm,
				bookingInfo: {
					...bookingInfo,
					[distination]: '',
				},
			},
		});
	};

	const onClickHandler = event => {
		event.preventDefault();
		setQuery(event.target.innerText);
		setSuggestions([]);
		globalStateController.updateState({
			stepperForm: {
				...stepperValues?.stepperForm,
				bookingInfo: {
					...bookingInfo,
					[distination]: event.target.innerText,
				},
			},
		});
	};
	return (
		<div className="autocomplete-container">
			<Input
				type="text"
				value={query}
				onChange={e => {
					setQuery(e.target.value);
					fetchSuggestions(e.target.value);
				}}
				placeholder={placeholder}
				className="w-full h-10 pl-12 pr-10 bg-white border border-gray-300 rounded-lg shadow focus:border-gray-400 focus:ring-gray-400"
			/>
			{query && (
				<button
					onClick={clearInput}
					className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
				>
					&#x2715; {/* Unicode for cross icon (×) */}
				</button>
			)}
			{query && suggestions && (
				<ul className="absolute w-full mt-2 bg-white rounded-lg shadow z-10">
					{suggestions.map(suggestion => (
						<li
							key={suggestion.place_id}
							onClick={onClickHandler}
							className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
						>
							{suggestion.description}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default GoMapsAutocomplete;
