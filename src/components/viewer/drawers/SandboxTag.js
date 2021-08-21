import React from 'react';
import './../Viewer.css';
import overview from './../Overview.module.scss';

const colors = {
	serverMethod: 'aqua',
	clientMethod: 'orange',
	removedMethod: 'red',
	undefined: 'gray',

	defaultColor: 'orange'
}

function SandboxTag(props) {
	// If props does not contain sandbox return nothing
	if(!props.sandbox || props.sandbox === 'undefined') return '';

	let sandboxColor = colors[props.sandbox] || colors.defaultColor;

	return (
		<span className={`${overview.Function_sandbox}`} style={{color: `${sandboxColor}`}}>
			{`${props.sandbox}`}
		</span>
	);
}

export default SandboxTag;