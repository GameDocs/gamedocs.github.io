import React from 'react';
import './../Viewer.css';
import overview from './../Overview.module.scss';
import { capitalizeTypeName, processMarkdownTags } from './FunctionUtil';

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

function FunctionReturns(props) {
	let func = props.data.func;
	let returns = func.returns;
	if(returns.length < 1) {
		return '';
	}

	let elements = [];
	
	for(let idx in returns) {
		let param = returns[idx];
		let desc = '';

		if(typeof param.description !== 'undefined') {
			desc = processMarkdownTags(param.description);
		}

		elements.push((
			<ul>
				<li key={`${idx}`}>
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
			<span className={`${overview.Function_label}`}>Returns:</span>
			{elements}
		</div>
	);
}

export default FunctionReturns;