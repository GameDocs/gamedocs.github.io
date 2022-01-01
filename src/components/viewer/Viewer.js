import React from 'react';
import './Viewer.css';
import styles from './Viewer.module.scss';
import ReactDOM from 'react-dom';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import FunctionView from './drawers/FunctionView';
import { updateJsonFormatLatest } from './converters/FormatConverter';
import DocsJson_data from '../data/api.0.5.1_658.json';
const DocsJson = updateJsonFormatLatest(DocsJson_data);

function DisplayOverview(idx) {
	let namespace = DocsJson.content[idx];

	let list = [];
	{
		let json = namespace.tabledata;
		let json_keys = Object.keys(json);
		for(let name of json_keys) {
			let data = {
				namespace: namespace.name,
				isLocal: false,
				func: json[name]
			};
			
			list.push(<FunctionView data={data}/>);
		}
	}

	{
		let json = namespace.userdata;
		let json_keys = Object.keys(json);
		for(let name of json_keys) {
			let data = {
				namespace: namespace.name,
				isLocal: true,
				func: json[name]
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

function DisplayOverviewFiltered(filter) {
	let list = [];
	for(let namespace of DocsJson.content) {
		if(namespace.name.indexOf(filter) !== -1) {
			{
				let json = namespace.tabledata;
				let json_keys = Object.keys(json);
				for(let name of json_keys) {
					let data = {
						namespace: namespace.name,
						isLocal: false,
						id: `${namespace.name}_${name}_false`,
						func: json[name]
					};
					
					list.push(<FunctionView data={data}/>);
				}
			}
		
			{
				let json = namespace.userdata;
				let json_keys = Object.keys(json);
				for(let name of json_keys) {
					let data = {
						namespace: namespace.name,
						isLocal: true,
						id: `${namespace.name}_${name}_true`,
						func: json[name]
					};
					
					list.push(<FunctionView data={data}/>);
				}
			}
		}
	}

	ReactDOM.render(
		<div>
			{list}
		</div>,
		document.getElementById('overview-content')
	);
}

// TODO: Maybe tint function boxes depending on the sandbox
// TODO: Add hyperlink elements to all functions
// TODO: Fix all unique key lists. This will probably make some elements have the correct size in the future.


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
	
	const [ menu, setMenu ] = React.useState(false);

	const updateTreeViewer = () => {
		let search = document.getElementById('searchBar').value;
		let list = document.querySelectorAll('.MuiCollapse-wrapperInner .MuiTreeItem-root');
		for(let i = 0; i < list.length; i++) {
			let elm = list[i];

			let text = elm.innerText;
			let idx = text.indexOf(search);
			if(idx === -1) {
				elm.style.display = 'none';
			} else {
				elm.style.display = '';
			}
		}

		/*
		if(search.trim().length >= 0) {
			DisplayOverviewFiltered(search);
		}
		*/
	};

	const createTreeList = () => {
		let search = document.getElementById('searchBar')?.value || '';

		let list = [];
		let json = DocsJson.content;
		
		let json_keys = Object.keys(json);
		for(let key of json_keys) {
			let name = json[key].name;

			if(name.indexOf(search) !== -1) {
				list.push(<TreeItem key={`${key}`} nodeId={`${key}`} label={`${name}`} />);
			}
		}

		return list;
	}

	const handleSelect = (event, nodeId) => {
		if(!nodeId.startsWith('#root_')) {
			setMenu(false);
			DisplayOverview(nodeId);
		}
	};

	let version = "0.5.1";

	React.useEffect(() => {
		document.body.addEventListener('keydown', (event) => {
			if((event.ctrlKey || event.metaKey) && event.key === 's') {
				event.preventDefault();
				
				let modal = document.getElementById('save-modal');
				modal.classList.toggle('save-modal-visible');

				let data = JSON.stringify(DocsJson, null, '\t');
				const jsonBlob = new Blob([data], {type : 'application/json'});
				
				let modalLink = document.getElementById('save-modal-href');
				modalLink.href = URL.createObjectURL(jsonBlob);
			}
		});
	}, []);
	
	return (
		<div id="viewer">
			<div id="save-modal" onMouseDown={event => event.target.classList.toggle('save-modal-visible')}>
				<div className={`${styles.Modal}`}>
					<a href="." id="save-modal-href" download={`${'0.5.1_658_edited.json'}`}>Save JSON</a>
				</div>
			</div>
			<div className={`${styles.SummaryDarkScreen} ${menu ? styles.Show:''}`} onClick={() => setMenu(false)}/>
			<div id="summary" className={`${styles.Summary} ${menu ? styles.Show:''}`}>
				<div>
					<div className={`${styles.Version}`}>
						ScrapMechanic {`${version}`} API
					</div>
					<input id="searchBar" type="text" placeholder="Search" name="search" onChange={updateTreeViewer} />
				</div>
				<div className={`${styles.TreeViewer}`}>
					<TreeView
						className={`${styles.TreeView}`}
						defaultCollapseIcon={<ExpandMoreIcon/>}
						defaultExpandIcon={<ChevronRightIcon/>}
						onNodeToggle={updateTreeViewer}
						onNodeSelect={handleSelect}
					>
						<TreeItem nodeId="#root_1" label="Namespaces">
							{createTreeList()}
						</TreeItem>
					</TreeView>
				</div>
			</div>
			<div id="overview">
				<Breadcrumbs aria-label="breadcrumb">

				</Breadcrumbs>
				<div className={`${styles.Menu}`}>
					<div className={`${styles.Menu_hamburger}`} onClick={() => setMenu(true)}>
						Hamburger
					</div>
				</div>

				<div className={`${styles.Content}`}>
					{
					/*
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
					*/
					}

					<h1>Functions</h1>

					<div id="overview-content">
						
					</div>
				</div>
			</div>
		</div>
	);
}

export default Viewer;
