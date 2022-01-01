export function makeString(json, optional = false) {
	if(typeof json === 'undefined' || json === '') {
		return optional ? undefined:'';
	}

	return `${json}`;
}

export function makeNumber(json, optional = false) {
	if(typeof json === 'undefined') {
		return optional ? undefined:0;
	}

	return parseFloat(`${json}`);
}

export function makeStringArray(json) {
	let result = [];
	for(let value of Object.values(json)) {
		result.push(`${value}`);
	}
	return result;
}