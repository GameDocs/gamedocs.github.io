import React from 'react';
import ReactMarkdown from 'react-markdown';
import './../Viewer.css';
import overview from './../Overview.module.scss';

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

function FunctionDesc(props) {
	let desc = props.desc;
	if(typeof desc === 'undefined') {
		return '';
	}

	return (
		<div className={`${overview.Function_desc}`}>
			{processMarkdownTags(desc)}
		</div>
	);
}

export default FunctionDesc;