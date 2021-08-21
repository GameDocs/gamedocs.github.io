import React from 'react';
import './../Viewer.css';
import overview from './../Overview.module.scss';
import editor from './../Editor.module.scss';

import FunctionRender from './FunctionRender'

class FunctionView extends React.Component {
	constructor(props) {
		super(props);
		let data = props.data;
		this.state = {data: props.data};
		this.id = `${data.namespace}_${data.name}_${data.isLocal}`;
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onSandboxChanged = this.onSandboxChanged.bind(this);
		this.onAddParam = this.onAddParam.bind(this);
	}
	
	onSandboxChanged(event) {
		this.state.data.func.sandbox = event.target.value;
		this.setState({data: this.state.data});
	}

	handleSubmit(event) {
		console.log(this.state.data);
		event.preventDefault();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({data: nextProps.data});
	}
	
	createSandboxSelection() {
		return (
			<select
				id={`${this.id}_sandbox`}
				className={`${editor.Sandbox}`}
				value={this.state.data.func.sandbox || 'undefined'}
				name='sandbox'
				onChange={this.onSandboxChanged}
			>
				<option value='serverMethod'>serverMethod</option>
				<option value='clientMethod'>clientMethod</option>
				<option value='removedMethod'>removedMethod</option>
				<option value='undefined'>undefined</option>
			</select>
		);
	}

	onRemoveParam(idx) {
		this.state.data.func.params.splice(idx, 1);
		this.refresh();
	}

	onMoveParam(idx, dir) {
		let params = this.state.data.func.params;
		let ndx = parseInt(idx) + dir;
		if(ndx < 0 || ndx >= params.length) {
			return;
		}

		let a = params[idx];
		let b = params[ndx];
		params[idx] = b;
		params[ndx] = a;

		this.refresh();
	}

	onAddParam() {
		this.state.data.func.params.push({
			name: '',
			type: ['unknown'],
			description: ''
		});
		this.refresh();
	}

	onParamNameChange(event, param) {
		param.name = `${event.target.value}`;
		this.refresh();
	}

	onParamTypeChange(event, param) {
		param.type = `${event.target.value}`.split(',');
		this.refresh();
	}

	onParamDescriptionChange(event, param) {
		param.description = event.target.value;
		this.refresh();
	}

	refresh() {
		this.setState({data: this.state.data});
	}

	createParams() {
		let dataTypes = [
			'AiState', 'AreaTrigger', 'Body', 'Character', 'Color',
			'Container', 'Effect', 'Widget', 'Interface', 'Harvestable',
			'Interactable', 'Joint', 'Lift', 'Network', 'PathNode',
			'Player', 'Portal', 'Quat', 'Quest', 'RaycastResult',
			'Shape', 'Storage', 'Tool', 'Unit', 'Uuid', 'Vec3',
			'Visualization', 'Blueprint'
		];
		let dataElements = [];
		for(const type of dataTypes) {
			dataElements.push(<option value={`${type}`}/>);
		}

		let dataTypeList = (
			<datalist id='editor_types'>
				{dataElements}
			</datalist>
		);

		let parameters = [];

		let params = this.state.data.func.params;
		if(typeof params !== 'undefined') {
			for(let idx in params) {
				let param = params[idx];

				parameters.push(
					<div className={`${editor.Param}`}>
						<div className={`${editor.Param_buttons}`}>
							<div className={`${editor.Param_button}`} onClick={() => this.onRemoveParam(idx)}>Remove</div>
							<div className={`${editor.Param_button}`} onClick={() => this.onMoveParam(idx, -1)}>Up</div>
							<div className={`${editor.Param_button}`} onClick={() => this.onMoveParam(idx, 1)}>Down</div>
						</div>
						<label>Name:
							<input
								className={`${editor.Param_text}`}
								defaultValue={`${param.name || param.type}`}
								onChange={evt => this.onParamNameChange(evt, param)}
								type='text'
							/>
						</label>
						<br/>
						<label>Types:
							<input
								className={`${editor.Param_text}`}
								defaultValue={`${param.type}`}
								onChange={evt => this.onParamTypeChange(evt, param)}
								type='text'
							/>
						</label>
						<br/>
						<label>Description:
							<textarea
								className={`${editor.Param_textarea}`}
								defaultValue={`${param.description || ''}`}
								spellcheck='false'
								onChange={evt => this.onParamDescriptionChange(evt, param)}
							/>
						</label>
					</div>
				);
			}
		}
		
		return (
			<div>
				{parameters}
				<div>
					<div className={`${editor.Param_button}`} onClick={this.onAddParam}>Add Parameter</div>
				</div>
			</div>
		);
	}

	renderForm() {
		let sandboxSelection = this.createSandboxSelection();
		let paramsEditor = this.createParams();
		
		return (
			<form id={`${this.id}`} onSubmit={this.handleSubmit}>
				<label>Sandbox: {sandboxSelection}</label>
				<br/>
				<label>Params: {paramsEditor}</label>
				<br/>
				<br/>
				<br/>
				<input type='submit' value='Save'/>
			</form>
		);
	}

	render() {
		let data = this.state.data;

		return (
			<div className={`${overview.Function} ${data.isLocal ? `${overview.Function_local}`:''}`}>
				<FunctionRender data={data}/>
				
				<div className={`${overview.Function_editor}`}>
					{this.renderForm()}
				</div>
			</div>
		);
	}
}

export default FunctionView;