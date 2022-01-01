import React from 'react';
import functionStyle from './../Function.module.scss';
import { processMarkdownTags } from './FunctionUtil';

function FunctionDesc(props) {
	if(typeof props.desc === 'undefined') {
		return null;
	}

	return (
		<div className={`${functionStyle.Description}`}>
			{processMarkdownTags(props.desc)}
		</div>
	);
}

export default FunctionDesc;