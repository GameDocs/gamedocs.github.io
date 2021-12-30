import React from 'react';
import { isMobile } from 'react-device-detect';
import overview from './../Overview.module.scss';
import editor from './../Editor.module.scss';

import FunctionRender from './FunctionRender'

class FunctionView extends React.Component {
	constructor(props) {
		super(props);
		let data = props.data;
		this.state = {data: props.data};
		this.id = `${data.namespace}_${data.name}_${data.isLocal}`;
		this.onSandboxChanged = this.onSandboxChanged.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onAddParam = this.onAddParam.bind(this);
		this.onAddReturnParam = this.onAddReturnParam.bind(this);
	}
	
	onSandboxChanged(event) {
		this.state.data.func.sandbox = event.target.value;
		this.setState({data: this.state.data});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({data: nextProps.data});
	}

	onRemoveParam(idx) {
		this.state.data.func.params.splice(idx, 1);
		this.refresh();
	}

	onMoveParam(idx, dir) {
		let isLocal = this.state.data.isLocal;
		let params = this.state.data.func.params;
		let ndx = parseInt(idx) + dir;
		if(ndx < (isLocal ? 1:0) || ndx >= params.length) {
			return;
		}

		let tmp = params[idx];
		params[idx] = params[ndx];
		params[ndx] = tmp;

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

	onAddParam() {
		this.state.data.func.params.push({
			name: '',
			type: ['unknown'],
			description: ''
		});
		this.refresh();
	}


	onRemoveReturnParam(idx) {
		this.state.data.func.returns.splice(idx, 1);
		this.refresh();
	}

	onMoveReturnParam(idx, dir) {
		let returns = this.state.data.func.returns;
		let ndx = parseInt(idx) + dir;
		if(ndx < 0 || ndx >= returns.length) {
			return;
		}

		let tmp = returns[idx];
		returns[idx] = returns[ndx];
		returns[ndx] = tmp;

		this.refresh();
	}

	
	onReturnTypeChange(event, param) {
		param.type = `${event.target.value}`.split(',');
		this.refresh();
	}

	onReturnDescriptionChange(event, param) {
		param.description = event.target.value;
		this.refresh();
	}

	onAddReturnParam() {
		this.state.data.func.returns.push({
			type: ['unknown'],
			description: ''
		});
		this.refresh();
	}

	onDescriptionChange(event) {
		this.state.data.func.description = event.target.value;
		this.refresh();
	}
	

	refresh() {
		this.setState({data: this.state.data});
	}

	createSandboxSelection() {
		return (
			<select
				className={`${editor.Sandbox}`}
				value={this.state.data.func.sandbox || 'undefined'}
				name='sandbox'
				onChange={this.onSandboxChanged}
			>
				<option value='undefined'>default</option>
				<option value='serverMethod'>serverMethod</option>
				<option value='clientMethod'>clientMethod</option>
				<option value='removedMethod'>removedMethod</option>
			</select>
		);
	}

	createParams() {
		let elements = [];

		let params = this.state.data.func.params;
		let isLocal = this.state.data.isLocal;
		if(typeof params !== 'undefined') {
			for(let idx in params) {
				if(isLocal && idx < 1) {
					// We do not show the first parameter of a local function
					continue;
				}
				let param = params[idx];

				elements.push(
					<div className={`${editor.Param}`}>
						<div>
							<div className={`${editor.Param_buttons_move}`}>
								<div className={`${editor.Param_button}`} onClick={() => this.onMoveParam(idx, -1)}>Up</div>
								<div className={`${editor.Param_button}`} onClick={() => this.onMoveParam(idx, 1)}>Down</div>
							</div>
							<div className={`${editor.Param_buttons_remove}`}>
								<div className={`${editor.Param_button}`} onClick={() => this.onRemoveParam(idx)}>Remove</div>
							</div>
						</div>
						<label>Name:
							<input
								className={`${editor.Param_text}`}
								value={`${param.name}`}
								placeholder={`${param.name || param.type}`}
								onChange={evt => this.onParamNameChange(evt, param)}
								type='text'
							/>
						</label>
						<label>Type:
							<input
								className={`${editor.Param_text}`}
								value={`${param.type}`}
								onChange={evt => this.onParamTypeChange(evt, param)}
								type='text'
							/>
						</label>
						<label>Description:
							<textarea
								className={`${editor.Param_textarea}`}
								value={`${param.description || ''}`}
								spellcheck='false'
								onChange={evt => this.onParamDescriptionChange(evt, param)}
							/>
						</label>
					</div>
				);
			}
		}
		
		return (
			<div className={`${editor.Param_block}`}>
				{elements}
				<div>
					<div className={`${editor.Param_button}`} onClick={this.onAddParam}>Add Parameter</div>
				</div>
			</div>
		);
	}

	createReturnParams() {
		let elements = [];

		let returns = this.state.data.func.returns;
		if(typeof returns !== 'undefined') {
			for(let idx in returns) {
				let param = returns[idx];

				elements.push(
					<div className={`${editor.Param}`}>
						<div>
							<div className={`${editor.Param_buttons_move}`}>
								<div className={`${editor.Param_button}`} onClick={() => this.onMoveReturnParam(idx, -1)}>Up</div>
								<div className={`${editor.Param_button}`} onClick={() => this.onMoveReturnParam(idx, 1)}>Down</div>
							</div>
							<div className={`${editor.Param_buttons_remove}`}>
								<div className={`${editor.Param_button}`} onClick={() => this.onRemoveReturnParam(idx)}>Remove</div>
							</div>
						</div>
						<label>Type:
							<input
								className={`${editor.Param_text}`}
								value={`${param.type}`}
								onChange={evt => this.onReturnTypeChange(evt, param)}
								type='text'
							/>
						</label>
						<label>Description:
							<textarea
								className={`${editor.Param_textarea}`}
								value={`${param.description || ''}`}
								spellcheck='false'
								onChange={evt => this.onReturnDescriptionChange(evt, param)}
							/>
						</label>
					</div>
				);
			}
		}

		return (
			<div className={`${editor.Param_block}`}>
				{elements}
				<div>
					<div className={`${editor.Param_button}`} onClick={this.onAddReturnParam}>Add Return</div>
				</div>
			</div>
		);
	}

	createDescriptionEditor() {
		return (
			<div>
				<textarea
					className={`${editor.Description_textarea}`}
					value={`${this.state.data.func.description || ''}`}
					spellcheck='false'
					onChange={this.onDescriptionChange}
				/>
			</div>
		);
	}

	renderForm() {
		let sandboxSelection = this.createSandboxSelection();
		let paramsEditor = this.createParams();
		let descriptionEditor = this.createDescriptionEditor();
		let returnParamEditor = this.createReturnParams();
		
		let folding = (event) => {
			if(event.currentTarget === event.target) {
				event.currentTarget.classList.toggle(`${editor.Param_folding}`);
			}
		};

		return (
			<form id={`${this.id}`} onSubmit={this.handleSubmit}>
				<div className={`${editor.Param_label_single}`}>
					Sandbox:
					{sandboxSelection}
				</div>
				<div className={`${editor.Param_label} ${editor.Param_folding}`} onClick={folding}>
					Params:
					{paramsEditor}
				</div>
				<div className={`${editor.Param_label} ${editor.Param_folding}`} onClick={folding}>
					Return:
					{returnParamEditor}
				</div>
				<div className={`${editor.Param_label_single}`}>
					Description:
					{descriptionEditor}
				</div>
			</form>
		);
	}

	render() {
		let data = this.state.data;

		let editorDiv = '';
		if(!isMobile) {
			// Only show the editor if we are on desktop. Adding this will also make the
			// page load faster on mobile and more power efficient
			
			let folding = (event) => {
				if(event.currentTarget === event.target) {
					event.currentTarget.classList.toggle(`${overview.Function_editor_hidden}`);
				}
			};

			editorDiv = (
				<div
					className={`${overview.Function_editor} ${overview.Function_editor_hidden}`}
					onClick={folding}
				>
					{this.renderForm()}
				</div>
			);
		}

		return (
			<div className={`${overview.Function} ${data.isLocal ? `${overview.Function_local}`:''}`}>
				<FunctionRender data={data}/>
				{editorDiv}
			</div>
		);
	}
}

export default FunctionView;