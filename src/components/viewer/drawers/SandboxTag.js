import React from 'react';
import functionStyle from './../Function.module.scss';

const colors = {
	serverMethod: 'aqua',
	clientMethod: 'orange',
	removedMethod: 'red',
	undefined: 'gray',

	defaultColor: 'orange'
};

const translation = {
	serverMethod: 'Server',
	clientMethod: 'Client',
	removedMethod: 'Removed',

	defaultName: 'Undefined'
};

function SandboxTag(props) {
	if(!props.sandbox || props.sandbox === 'undefined') {
		return null;
	}

	let sandboxColor = colors[props.sandbox] || colors.defaultColor;

	return (
		<span className={`${functionStyle.Sandbox}`} style={{color: `${sandboxColor}`}}>
			{`${translation[props.sandbox] || translation.defaultName}`}
		</span>
	);
}

export default SandboxTag;