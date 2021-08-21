
export function capitalizeName(name) {
	if(typeof name === 'undefined') {
		return '';
	}
	// Convert name into a string
	name = `${name}`;

	// Capitalize the first character
	return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
}
