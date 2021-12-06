export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	};
};

export const isDayTime = (timespan) => {
	const hours = new Date(timespan).getHours();
	return hours >= 6 && hours < 18;
};