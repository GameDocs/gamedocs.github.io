import React from 'react';
import functionStyle from './../Function.module.scss';

import SandboxTag from './SandboxTag';
import FunctionCall from './FunctionCall';
import FunctionDesc from './FunctionDesc';
import FunctionParams from './FunctionParams';
import FunctionReturns from './FunctionReturns';

function prettyName(ns) {
	let name = ns.substr(ns.lastIndexOf('.') + 1);
	return name.substr(0, 1).toUpperCase() + name.substr(1);
}

function FunctionRender(props) {
	let data = props.data;
	let func = data.func;

	let funcName = '';
	if(data.isLocal) {
		funcName = '<' + prettyName(data.namespace) + '>:' + func.name;
	} else {
		funcName = func.name;
	}
	
	return (
		<div className={`${functionStyle.Content}`}>
			<div>
				<span className={`${functionStyle.Name}`}>{`${funcName}`}</span>
				<SandboxTag sandbox={`${func.sandbox}`}/>
				<div className={`${functionStyle.EditButton}`} onClick={props.onEdit}>Edit</div>
			</div>

			<FunctionCall data={data}/>
			<FunctionParams data={data}/>
			<FunctionDesc desc={func.description}/>
			<FunctionReturns data={data}/>
		</div>
	);
}

export default FunctionRender;