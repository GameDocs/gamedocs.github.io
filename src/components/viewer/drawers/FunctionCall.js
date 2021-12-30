import React from 'react';
import overview from './../Overview.module.scss';
import { capitalizeName } from './FunctionUtil';

function prettyName(ns) {
	let name = ns.substring(ns.lastIndexOf('.') + 1);
	return capitalizeName(name);
}

function prettyParams(params, isLocal) {
	let result = '';

	for(let idx in params) {
		if(isLocal && idx < 1) {
			// We do not show the first parameter of a local function
			continue;
		}

		let elm = params[idx];
		result += ', ';

		if(elm.name) {
			result += elm.name;
		} else {
			if(elm.type.length === 1) {
				result += elm.type;
			} else {
				result += `[${elm.type}]`;
			}
		}
	}

	if(result.length > 0) {
		result = result.substring(2);
	}

	return result;
}

function FunctionCall(props) {
	let data = props.data;

	let callName = '';
	if(data.isLocal) {
		callName = '<' + prettyName(data.namespace) + '>:';
	} else {
		callName = data.namespace + '.';
	}
	let callParams = prettyParams(data.func.params, data.isLocal);
	
	return (
		<pre className={`${overview.Function_call}`}>
			{callName}<span className={`${overview.Function_call_name}`}>{data.name}</span>({callParams})
		</pre>
	);
}

export default FunctionCall;