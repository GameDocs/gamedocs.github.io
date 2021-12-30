import React from 'react';
import overview from './../Overview.module.scss';
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
			elements.push(<span className={`${overview.Function_params_separator}`}/>);
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
		return '';
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
					<span className={`${overview.Function_params_name}`}>
						{getParamName(param, idx)}
					</span>
					<span className={`${overview.Function_params_type}`}>
						{getParamType(param.type)}
					</span>
					{desc}
				</li>
			</ul>
		);
	}

	return (
		<div className={`${overview.Function_params}`}>
			<span className={`${overview.Function_label}`}>Params:</span>
			{elements}
		</div>
	);
}

export default FunctionParams;