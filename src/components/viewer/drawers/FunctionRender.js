import React from 'react';
import './../Viewer.css';
import overview from './../Overview.module.scss';

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

	let funcName = ''
	if(data.isLocal) {
		funcName = '<' + prettyName(data.namespace) + '>:' + data.name;
	} else {
		funcName = data.name;
	}
	
	return (
		<div className={`${overview.Function_content}`}>
			<div>
				<span className={`${overview.Function_name}`}>
					{`${funcName}`}
				</span>
				<SandboxTag sandbox={`${func.sandbox}`}/>
				<FunctionCall data={data}/>
			</div>

			<FunctionParams data={data}/>
			<FunctionDesc desc={func.description}/>
			<FunctionReturns data={data}/>
		</div>
	);
}

export default FunctionRender;