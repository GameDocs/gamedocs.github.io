import { makeString, makeStringArray, makeNumber } from './Types';

// This array keeps track of the next update method for the formats
const latestFormat = 2;
const formatUpdate = {
	1: updateFormat_2,
};

export function updateJsonFormatLatest(json) {
	return updateJsonFormat(json, latestFormat);
}

export function updateJsonFormat(json, target) {
	// Get the current format version
	let formatVersion = getFormatVersion(json);
	let resultFormat = json;

	for(let i = formatVersion; i < target; i++) {
		// Go trough all versions and update the format
		resultFormat = formatUpdate[i](resultFormat);
	}
	
	return resultFormat;
}

function getFormatVersion(json) {
	return json.format || 1;
}

function updateFormat_2(json) {
	// Update the json format
	let result = {
		author: makeString(json.author, true),
		comment: makeString(json.comment, true),
		time: makeNumber(json.time),
		version: makeString(json.version),
		format: 2,
		content: []
	};

	function updateParams(value) {
		if(typeof value === 'undefined') return [];
		let result = [];

		let keys = Object.keys(value);
		for(let idx in keys) {
			let name = keys[idx];
			let content = value[name];
			
			result.push({
				name: makeString(content.name),
				type: makeStringArray(content.type),
				description: makeString(content.description, true)
			});
		}
		return result;
	}

	function updateReturns(value) {
		if(typeof value === 'undefined') return [];
		let result = [];

		let keys = Object.keys(value);
		for(let idx in keys) {
			let name = keys[idx];
			let content = value[name];
			
			result.push({
				type: makeStringArray(content.type),
				description: makeString(content.description, true)
			});
		}
		return result;
	}

	function updateFunctions(value) {
		if(typeof value === 'undefined') return [];
		let result = [];

		let keys = Object.keys(value);
		for(let idx in keys) {
			let name = keys[idx];
			let func = value[name];

			result.push({
				name: makeString(name),
				sandbox: makeString(func.sandbox),
				params: updateParams(func.params),
				returns: updateReturns(func.returns),
				description: makeString(func.description, true),
			});
		}
		return result;
	}

	{
		let keys = Object.keys(json.content);
		for(let idx in keys) {
			let name = keys[idx];
			let value = json.content[name];

			result.content.push({
				name: makeString(name),
				userdata: updateFunctions(value.userdata),
				tabledata: updateFunctions(value.tabledata),
				constants: []
			});
		}
	}

	return result;
}
