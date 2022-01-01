import React from 'react';
import { isMobile } from 'react-device-detect';
import overview from './../Overview.module.scss';
import functionStyle from './../Function.module.scss';
import editor from './../Editor.module.scss';

import FunctionRender from './FunctionRender';
import ReorderableList from './ReorderableList';
import AnimateHeight from 'react-animate-height';

class FunctionView extends React.Component {
	constructor(props) {
		super(props);
		let data = props.data;
		this.state = {
			data: props.data,
			menu: false,
			paramFoldout: false,
			returnFoldout: false
		};
		this.id = `${data.namespace}_${data.name}_${data.isLocal}`;
		this.onSandboxChanged = this.onSandboxChanged.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onAddParam = this.onAddParam.bind(this);
		this.onAddReturnParam = this.onAddReturnParam.bind(this);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			data: nextProps.data,
			menu: false,
			paramFoldout: false,
			returnFoldout: false
		});
	}
	
	onSandboxChanged(event) {
		this.state.data.func.sandbox = event.target.value;
		this.refresh();
	}

	onRemoveParam(idx) {
		this.state.data.func.params.splice(idx, 1);
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
		this.setState({});
	}

	createSandboxSelection() {
		return (
			<select
				className={`${editor.Sandbox}`}
				value={this.state.data.func.sandbox || 'undefined'}
				name='sandbox'
				onChange={this.onSandboxChanged}
			>
				<option value='serverMethod'>Server</option>
				<option value='clientMethod'>Client</option>
				<option value='removedMethod'>Removed</option>
				<option value='undefined'>Default</option>
			</select>
		);
	}

	createParams() {
		const renderComp = (param, idx) => {
			return (
				<div className={`${editor.Param}`}>
					<div>
						<div className={`${editor.Param_buttons_remove}`}>
							<div className={`${editor.Param_button}`} onClick={() => this.onRemoveParam(idx)}>Remove</div>
						</div>
					</div>
					<div>
						<span className={`${editor.Param_span}`}>Name:</span>
						<input
							className={`${editor.Param_text}`}
							value={`${param.name}`}
							placeholder={`${param.name || param.type}`}
							onChange={evt => this.onParamNameChange(evt, param)}
							spellCheck='false'
							type='text'
						/>
					</div>
					<div>
						<span className={`${editor.Param_span}`}>Type:</span>
						<input
							className={`${editor.Param_text}`}
							value={`${param.type}`}
							onChange={evt => this.onParamTypeChange(evt, param)}
							spellCheck='false'
							type='text'
						/>
					</div>
					<div>
						<span className={`${editor.Param_span}`}>Description:</span>
						<textarea
							className={`${editor.Param_textarea}`}
							value={`${param.description || ''}`}
							onChange={evt => this.onParamDescriptionChange(evt, param)}
							spellCheck='false'
						/>
					</div>
				</div>
			);
		};

		const update = () => {
			this.refresh();
		};

		return (
			<div className={`${editor.Param_block}`}>
				<ReorderableList
					items={this.state.data.func.params}
					render={renderComp}
					update={update}
				/>
				<div>
					<div className={`${editor.Param_button}`} onClick={this.onAddParam}>Add Parameter</div>
				</div>
			</div>
		);
	}

	createReturnParams() {
		const renderComp = (param, idx) => {
			return (
				<div className={`${editor.Param}`}>
					<div>
						<div className={`${editor.Param_buttons_remove}`}>
							<div className={`${editor.Param_button}`} onClick={() => this.onRemoveReturnParam(idx)}>Remove</div>
						</div>
					</div>
					<div>
						<span className={`${editor.Param_span}`}>Type:</span>
						<input
							className={`${editor.Param_text}`}
							value={`${param.type}`}
							onChange={evt => this.onReturnTypeChange(evt, param)}
							spellCheck='false'
							type='text'
						/>
					</div>
					<div>
						<span className={`${editor.Param_span}`}>Description:</span>
						<textarea
							className={`${editor.Param_textarea}`}
							value={`${param.description || ''}`}
							onChange={evt => this.onReturnDescriptionChange(evt, param)}
							spellCheck='false'
						/>
					</div>
				</div>
			);
		};

		const update = () => {
			this.refresh();
		};

		let returns = this.state.data.func.returns;

		return (
			<div className={`${editor.Param_block}`}>
				<ReorderableList
					items={returns}
					render={renderComp}
					update={update}
				/>
				<div>
					<div className={`${editor.Param_button}`} onClick={this.onAddReturnParam}>Add Return</div>
				</div>
			</div>
		);
	}

	createDescriptionEditor() {
		return (
			<textarea
				className={`${editor.Description_textarea}`}
				value={`${this.state.data.func.description || ''}`}
				spellCheck='false'
				onChange={this.onDescriptionChange}
			/>
		);
	}

	renderForm() {
		let sandboxSelection = this.createSandboxSelection();
		let paramsEditor = this.createParams();
		let descriptionEditor = this.createDescriptionEditor();
		let returnParamEditor = this.createReturnParams();
		
		let isParamFoldout = this.state.paramFoldout;
		let isReturnFoldout = this.state.returnFoldout;

		let foldingParam = (event) => {
			if(event.currentTarget === event.target) {
				this.setState({paramFoldout: !isParamFoldout});
			}
		};

		let foldingReturn = (event) => {
			if(event.currentTarget === event.target) {
				this.setState({returnFoldout: !isReturnFoldout});
			}
		};

		return (
			<form id={`${this.id}_form`} onSubmit={this.handleSubmit}>
				<div className={`${editor.Param_label_single}`}>
					Sandbox:
					{sandboxSelection}
				</div>
				<div className={`${editor.Param_label} ${isParamFoldout ? '':editor.Param_folding}`} onMouseDown={foldingParam}>
					Params:
					<AnimateHeight duration={300} height={isParamFoldout ? 'auto':0}>
						{paramsEditor}
					</AnimateHeight>
				</div>
				<div className={`${editor.Param_label} ${isReturnFoldout ? '':editor.Param_folding}`} onMouseDown={foldingReturn}>
					Return:
					<AnimateHeight duration={300} height={isReturnFoldout ? 'auto':0}>
						{returnParamEditor}
					</AnimateHeight>
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
		let menu = this.state.menu;

		let folding = (event) => {
			// Make sure we cannot access the edit menu on phones
			if(isMobile) return;

			if(event.currentTarget === event.target) {
				this.setState({data: data, menu: !menu});
			}
		};
		// max-width: calc(100% - 20px);
		return (
			<div className={`${functionStyle.Function} ${data.isLocal ? functionStyle.LocalFunction:''}`}>
				<div className={`${functionStyle.ContentAnimation} ${menu ? functionStyle.Editor:''}`}>
					<FunctionRender data={data}/>
				</div>
				<div
					className={`${overview.FunctionEditor} ${menu ? overview.Show:overview.Hidden}`}
					onClick={folding}
				>
					{menu ? this.renderForm():null}
				</div>
			</div>
		);
	}
}

export default FunctionView;