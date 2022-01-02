import React from 'react';
import editor from './../../Editor.module.scss';

class EditorParam extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onEdit: props.onEdit,
			onRemove: props.onRemove,
			index: props.index,
			param: props.param
		};
		this.onRemove = this.onRemove.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onTypeChange = this.onTypeChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
	}

	static getDerivedStateFromProps(props) {
		return {	
			onEdit: props.onEdit,
			onRemove: props.onRemove,
			index: props.index,
			param: props.param
		};
	}

	onRemove() {
		let idx = this.state.index;
		this.state.onRemove(idx);
	}

	onNameChange(event) {
		let param = this.state.param;
		param.name = `${event.target.value}`;
		this.refresh();
	}

	onTypeChange(event) {
		let param = this.state.param;
		param.type = `${event.target.value}`.split(',');
		this.refresh();
	}

	onDescriptionChange(event) {
		let param = this.state.param;
		param.description = event.target.value;
		this.refresh();
	}

	refresh() {
		this.state.onEdit();
		this.setState({});
	}

	render() {
		let param = this.state.param;

		return (
			<div className={`${editor.Param}`}>
				<div>
					<div className={`${editor.Param_buttons_remove}`}>
						<div className={`${editor.Param_button}`} onClick={this.onRemove}>Remove</div>
					</div>
				</div>
				<div>
					<span className={`${editor.Param_span}`}>Name:</span>
					<input
						className={`${editor.Param_text}`}
						value={`${param.name}`}
						placeholder={`${param.name || (`${param.type}`.length === 0 ? 'unknown':param.type)}`}
						onChange={this.onNameChange}
						spellCheck='false'
						type='text'
					/>
				</div>
				<div>
					<span className={`${editor.Param_span}`}>Type:</span>
					<input
						className={`${editor.Param_text}`}
						value={`${param.type}`}
						placeholder='unknown'
						onChange={this.onTypeChange}
						spellCheck='false'
						type='text'
					/>
				</div>
				<div>
					<span className={`${editor.Param_span}`}>Description:</span>
					<textarea
						className={`${editor.Param_textarea}`}
						value={`${param.description || ''}`}
						onChange={this.onDescriptionChange}
						spellCheck='false'
					/>
				</div>
			</div>
		);
	}
}

export default EditorParam;