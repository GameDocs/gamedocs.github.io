import React from 'react';
import './Viewer.css';
import styles from './Viewer.module.scss';
import overview from './Overview.module.scss';
import ReactDOM from 'react-dom';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import FunctionView from './drawers/FunctionView';


import DocsJson from '../data/api.0.5.1_658.json';

function TestTree() {
	let list = [];

	let json = DocsJson.content;
	
	let json_keys = Object.keys(json);
	for(let i in json_keys) {
		let name = json_keys[i];
		let cont = json[json_keys[i]];

		list.push(<TreeItem nodeId={`${name}`} label={`${name}`} />);
	}

	return list;
}

function FunctionParameters(func) {
	let list = [];

	let json_keys = Object.keys(func);
	for(let i in json_keys) {
		let name = json_keys[i];
		let a = func[name];
		console.log(a);
	}

	return (
		<span>
			{list}
		</span>
	);
}

/*
function StringifyParam(param, allowName = true) {
	if(param.name && allowName) {
		return (<code className={`${styles.DeclParam}`}>{param.name}</code>);
	}
	
	if(param.type.length === 1) {
		return (<code className={`${styles.DeclParam}`}>{param.type[0]}</code>);
	}

	return (
		<code className={`${styles.DeclParamTable}`}>
			{param.type.map((value) => {
				return (<code className={`${styles.DeclParam}`}>{value}</code>);
			})}
		</code>
	);
}
*/

function TestOverview(namespace) {
	let list = [];
	{
		let json = DocsJson.content[namespace].tabledata;
		let json_keys = Object.keys(json);
		for(let i in json_keys) {
			let name = json_keys[i];
			let func = json[name];
			let data = {
				namespace: namespace,
				isLocal: false,
				name: name,
				func: func
			};
			
			list.push(<FunctionView data={data}/>);
		}
	}

	{
		let json = DocsJson.content[namespace].userdata;
		let json_keys = Object.keys(json);
		for(let i in json_keys) {
			let name = json_keys[i];
			let func = json[name];
			let data = {
				namespace: namespace,
				isLocal: true,
				name: name,
				func: func
			};
			
			list.push(<FunctionView data={data}/>);
		}
	}
	

	ReactDOM.render(
		<div>
			{list}
		</div>,
		document.getElementById('overview-content')
	);
}

function Viewer(props) {
	React.useEffect(() => {
		/*{
			let search_list = document.getElementById('class-search-list');
			let search_elements = Array.prototype.slice.call(search_list.children, 0);
			search_elements.sort((a, b) => {
				let as = a.innerText;
				let bs = b.innerText;
				return as.localeCompare(bs);
			});

			// Clear the elements to then feed the sorted elements back into the div
			search_list.innerHTML = '';
			for(let i in search_elements) {
				search_list.appendChild(search_elements[i]);
			}
		}

		if(window.location.hash) {
			let hash = window.location.hash.substring(1);
			let namespace;
			{
				let idx = hash.lastIndexOf(':');
				if(idx >= 0) {
					namespace = hash.substring(0, idx);
				} else {
					idx = hash.lastIndexOf('.');
					if(idx >= 0) {
						namespace = hash.substring(0, idx);
					} else {
						namespace = hash;
					}
				}
			}

			//filter_elements(namespace, true);
			window.location.hash = '#';
			window.location.hash = '#' + hash.toLowerCase();
		}*/
	});

	const [expanded, setExpanded] = React.useState([]);
	const [selected, setSelected] = React.useState([]);

	const updateTreeViewer = (search) => {
		console.log('Filter again');

		let list = document.querySelectorAll('.MuiTreeItem-group .MuiTreeItem-label');
		for(let i = 0; i < list.length; i++) {
			let elm = list[i];

			let text = elm.innerText;
			let idx = text.indexOf(search);
			if(idx == -1) {
				elm.style.display = 'none';
			} else {
				elm.style.display = '';
			}
		}
	};

	
	const handleToggle = (event, nodeIds) => {
		setExpanded((oldExpanded) =>
			[ nodeIds[0] ]
		);
	};

	const handleSelect = (event, nodeId) => {
		setSelected(nodeId);

		if(!nodeId.startsWith('#root_')) {
			console.log(nodeId);
			TestOverview(nodeId);
		}
	};

	let version = "0.5.1";

	return (
		<div id="viewer">
			{/**
			* Three section
			* 
			* When editing
			*  [ Summary | Overview | Editor ]
			* 
			* When coding
			*  [ Summary | Overview ]
			* 
			*/}
			<div id="summary">
				<div>
					<div className={`${styles.Version}`}>
						ScrapMechanic {`${version}`} API
					</div>
					<input id="searchBar" type="text" placeholder="Search" name="search" onChange={(e) => updateTreeViewer(e.target.value)} />
				</div>

				<div className={`${styles.TreeViewer}`}>
					<TreeView
						className={`${styles.TreeView}`}
						onNodeToggle={handleToggle}
						onNodeSelect={handleSelect}
						expanded={expanded}
					>
						<TreeItem nodeId="#root_1" label="General">
							<TreeItem nodeId="#root_functions" label="Functions" />
							<TreeItem nodeId="#root_userdata" label="Userdata" />
						</TreeItem>
						<TreeItem nodeId="#root_2" label="Callbacks">
							{TestTree()}
						</TreeItem>
						<TreeItem nodeId="#root_3" label="Classes">
							{TestTree()}
						</TreeItem>
					</TreeView>
				</div>
			</div>
			<div id="overview">
				<Breadcrumbs aria-label="breadcrumb">

				</Breadcrumbs>

				<div className={`${styles.Content}`}>
					<p>
					This is the overview page that should display information about the
					currently selected item in the summary page.
					</p>

					<p>
					All information here should show the modder/coder how to use the
					namespace and provide information about how the callbacks/functions
					should be used. This page should also include examples of code and
					be used as a tool for other developers.
					</p>

					<div id="overview-content">
						
					</div>
				</div>
			</div>
			<div id="editor">
				EDITOR
			</div>
		</div>
	);
}

export default Viewer;
