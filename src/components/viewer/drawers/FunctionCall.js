import React from 'react';
import functionStyle from './../Function.module.scss';
import { capitalizeName } from './FunctionUtil';

function prettyName(ns) {
	let name = ns.substring(ns.lastIndexOf('.') + 1);
	return capitalizeName(name);
}

function prettyParams(params, isLocal) {
	let result = '';

	for(let idx in params) {
		if(isLocal && idx < 1) {
			continue;
		}

		let elm = params[idx];
		result += ', ';

		if(elm.name) {
			result += elm.name;
		} else {
			if(elm.type.length === 1) {
				result += elm.type[0] || 'unknown';
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
	let func = data.func;

	let callName = '';
	if(data.isLocal) {
		callName = '<' + prettyName(data.namespace) + '>:';
	} else {
		callName = data.namespace + '.';
	}
	let callParams = prettyParams(data.func.params, data.isLocal);
	
	return (
		<pre className={`${functionStyle.Call}`}>
			{callName}<span className={`${functionStyle.CallName}`}>{func.name}</span>({callParams})
		</pre>
	);
}

export default FunctionCall;