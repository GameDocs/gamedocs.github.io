import React from 'react';
import functionStyle from './../Function.module.scss';
import { processMarkdownTags } from './FunctionUtil';

function FunctionDesc(props) {
	let desc = props.desc;
	if(typeof desc === 'undefined') {
		return null;
	}

	return (
		<div className={`${functionStyle.Description}`}>
			{processMarkdownTags(desc)}
		</div>
	);
}

export default FunctionDesc;