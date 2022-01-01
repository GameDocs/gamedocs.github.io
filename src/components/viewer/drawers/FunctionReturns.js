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

	return (
		<div className={`${functionStyle.Params}`}>
			<span className={`${functionStyle.ParamLabel}`}>Returns:</span>
			<ul>
				{returns.map((param, idx) => (
					<li key={`${idx}`}>
						<span className={`${functionStyle.ParamType}`}>
							{getParamType(param.type)}
						</span>
						{typeof param.description !== 'undefined' ? processMarkdownTags(param.description):null}
					</li>
				))}
			</ul>
		</div>
	);
}

export default FunctionReturns;