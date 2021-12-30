import React from 'react';
import overview from './../Overview.module.scss';
import { processMarkdownTags } from './FunctionUtil';

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