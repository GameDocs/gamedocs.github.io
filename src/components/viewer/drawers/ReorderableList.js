import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: 'none',
	background: isDragging ? '#732':'transparent',
	...draggableStyle
});

class ReorderableList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: props.items,
			render: props.render,
			update: props.update
		};
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	static getDerivedStateFromProps(props) {
		return {
			items: props.items,
			render: props.render,
			update: props.update
		};
	}
	/*
	UNSAFE_componentWillReceiveProps(props) {
		this.setState({
			items: props.items,
			render: props.render,
			update: props.update
		});
	}
	*/

	onDragEnd(result) {
		// Dropped outside the list
		if (!result.destination) {
			return;
		}

		let resultItems = this.state.items;
		const [removed] = resultItems.splice(result.source.index, 1);
		resultItems.splice(result.destination.index, 0, removed);

		// TODO: Add correct ids to the application
		this.setState({
			items: resultItems
		});

		// Update parent
		this.state.update();
	}

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId='droppable'>
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{this.state.items.map((item, index) => (
								<Draggable key={`${index}`} draggableId={`${index}`} index={index}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={getItemStyle(
												snapshot.isDragging,
												provided.draggableProps.style
											)}
										>
											{this.state.render(item, index)}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}

export default ReorderableList;