import React from 'react';
import functionStyle from './../Function.module.scss';
import { capitalizeTypeName, processMarkdownTags } from './FunctionUtil';

function getParamType(types) {
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

function FunctionReturns(props) {
	let func = props.data.func;
	let returns = func.returns;
	if(returns.length < 1) {
		return null;
	}

	let elements = [];
	
	for(let idx in returns) {
		let param = returns[idx];
		let desc = '';

		if(typeof param.description !== 'undefined') {
			desc = processMarkdownTags(param.description);
		}

		elements.push(
			<ul>
				<li key={`${idx}`}>
					<span className={`${functionStyle.ParamType}`}>
						{getParamType(param.type)}
					</span>
					{desc}
				</li>
			</ul>
		);
	}

	return (
		<div class={`${functionStyle.Params}`}>
			<span className={`${functionStyle.ParamLabel}`}>Returns:</span>
			{elements}
		</div>
	);
}

export default FunctionReturns;