import ReactMarkdown from 'react-markdown';
import overview from './../Overview.module.scss';

export function capitalizeName(name) {
	if(typeof name === 'undefined') {
		return '';
	}
	// Convert name into a string
	name = `${name}`;

	// Capitalize the first character
	return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
}

export function capitalizeTypeName(name) {
	if(typeof name === 'undefined' || name.length === 0) {
		return 'Unknown';
	}
	
	// Convert name into a string
	name = `${name}`;

	/*
	let dataTypes = [
		'AiState', 'AreaTrigger', 'Body', 'Character', 'Color',
		'Container', 'Effect', 'Widget', 'Interface', 'Harvestable',
		'Interactable', 'Joint', 'Lift', 'Network', 'PathNode',
		'Player', 'Portal', 'Quat', 'Quest', 'RaycastResult',
		'Shape', 'Storage', 'Tool', 'Unit', 'Uuid', 'Vec3',
		'Visualization', 'Blueprint', 'GuiInterface'
	];
	*/

	switch(name.toLowerCase()) {
		case 'aistate': return 'AiState';
		case 'areatrigger': return 'AreaTrigger';
		case 'guiinterface': return 'GuiInterface';
		case 'pathnode': return 'PathNode';
		case 'raycastresult': return 'RaycastResult';
	}

	// Capitalize the first character
	return name.substring(0, 1).toUpperCase() + name.substring(1);
}

export function applyMarkdown(text) {
	return (
		<ReactMarkdown>{text}</ReactMarkdown>
	);
}

export function processMarkdownTags(text) {
	let noteTypes = [ 'Note', 'Warning' ];
	
	// Split the text with lookahead so that we still keep the tag information
	let array = text.split(new RegExp(`(?=\n\n${noteTypes.join('\n\n|\n\n')}\n\n)`));
	let elements = [];
	for(let idx in array) {
		let textBlock = array[idx];

		// If the index is greater than zero we know it has a tag
		if(idx > 0) {
			let breakIdx = textBlock.indexOf('\n\n', 2);
			let noteType = textBlock.substr(2, breakIdx).trim();
			let noteStyle = overview['Function_desc_' + noteType.toLowerCase()];
			let noteMessage = textBlock.substr(breakIdx + 2);
			
			elements.push(
				<div className={`${noteStyle}`}>
					<div className={`${noteStyle} ${overview.note_title}`}>{`${noteType}`}</div>
					<div>{applyMarkdown(noteMessage)}</div>
				</div>
			);
		} else {
			elements.push(applyMarkdown(textBlock));
		}
	}

	return (
		<div>{elements}</div>
	);
}