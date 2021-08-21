import React from 'react';
import ReactMarkdown from 'react-markdown';
import './../Viewer.css';
import overview from './../Overview.module.scss';
import { capitalizeName } from './FunctionUtil';

function applyMarkdown(text) {
	return (
		<ReactMarkdown>{text}</ReactMarkdown>
	);
}

function processMarkdownTags(text) {
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

function getParamName(param) {
	if(typeof param.name === 'undefined') {
		return `${param.type}`;
	}

	return param.name;
}

function getParamType(types) {
	if(types.length === 1) {
		return capitalizeName(types);
	}

	let elements = [];
	for(let idx in types) {
		let type = types[idx];

		if(idx > 0) {
			elements.push(<span className={`${overview.Function_params_separator}`}/>);
		}
		elements.push(capitalizeName(type));
	}
	
	return elements;
}

function FunctionParams(props) {
	let func = props.data.func;
	let params = func.params;
	if(params.length === 0) {
		return '';
	}

	let elements = [];
	
	for(let param of params) {
		let desc = '';

		if(typeof param.description !== 'undefined') {
			desc = processMarkdownTags(param.description);
		}

		elements.push((
			<ul>
				<li>
					<span className={`${overview.Function_params_name}`}>
						{getParamName(param)}
					</span>
					<span className={`${overview.Function_params_type}`}>
						{getParamType(param.type)}
					</span>
					{desc}
				</li>
			</ul>
		));
	}

	return (
		<div class={`${overview.Function_params}`}>
			{elements}
		</div>
	);
}

export default FunctionParams;