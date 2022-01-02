import React from 'react';
import functionStyle from './../Function.module.scss';
import { capitalizeTypeName, processMarkdownTags } from './FunctionUtil';

function getParamType(types) {
	let elements = [];
	for(let idx in types) {
		let type = types[idx];

		if(idx > 0) {
			elements.push(<span key={`${idx}`} className={`${functionStyle.ParamSeparator}`}/>);
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

	return (
		<div className={`${functionStyle.Params}`}>
			<span className={`${functionStyle.ParamLabel}`}>Params:</span>
			<ul>
				{params.map((param, idx) => {
					if(isLocal && idx < 1) {
						return null;
					}
					
					return (
						<li key={`${idx}`}>
							<span className={`${functionStyle.ParamName}`}>
								{`${param.name || ('param ' + idx)}`}
							</span>
							<span className={`${functionStyle.ParamType}`}>
								{getParamType(param.type)}
							</span>
							{typeof param.description !== 'undefined' ? processMarkdownTags(param.description):null}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default FunctionParams;