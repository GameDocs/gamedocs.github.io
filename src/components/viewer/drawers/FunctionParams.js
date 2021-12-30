import React from 'react';
import functionStyle from './../Function.module.scss';
import { capitalizeTypeName, processMarkdownTags } from './FunctionUtil';

function getParamName(param, idx) {
	return `${param.name || ('param ' + idx)}`;
}

function getParamType(types) {
	if(types.length === 1) {
		return capitalizeTypeName(types);
	}

	let elements = [];
	for(let idx in types) {
		let type = types[idx];

		if(idx > 0) {
			elements.push(<span className={`${functionStyle.ParamSeparator}`}/>);
		}
		elements.push(capitalizeTypeName(type));
	}
	
	return elements;
}

function FunctionParams(props) {
	let func = props.data.func;
	let params = func.params;
	let isLocal = props.data.isLocal;
	if(params.length < (isLocal ? 2:1)) {
		return null;
	}

	let elements = [];
	
	for(let idx in params) {
		if(isLocal && idx < 1) {
			// We do not show the first parameter of a local function
			continue;
		}

		let param = params[idx];
		let desc = '';

		if(typeof param.description !== 'undefined') {
			desc = processMarkdownTags(param.description);
		}

		elements.push(
			<ul>
				<li key={`${idx}`}>
					<span className={`${functionStyle.ParamName}`}>
						{getParamName(param, idx)}
					</span>
					<span className={`${functionStyle.ParamType}`}>
						{getParamType(param.type)}
					</span>
					{desc}
				</li>
			</ul>
		);
	}

	return (
		<div className={`${functionStyle.Params}`}>
			<span className={`${functionStyle.ParamLabel}`}>Params:</span>
			{elements}
		</div>
	);
}

export default FunctionParams;