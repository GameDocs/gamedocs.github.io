import React from 'react';
import './Viewer.css';
import styles from './Viewer.module.scss';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


import DocsJson from '../data/api.0.5.1_658.json';

function TestTree() {
	let list = [];

	let json = DocsJson.content;
	
	let json_keys = Object.keys(json);
	for(let i in json_keys) {
		let name = json_keys[i];
		let cont = json[json_keys[i]];

		
		list.push(<TreeItem nodeId={`{${i}+100}`} label={`${name}`} />);
	}

	return list;
}

function NodeSelected(event, nodeIds) {
	console.log(nodeIds);
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

		// Important
		//updateTreeViewer(document.getElementById('searchBar').value);
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
					<input id="searchBar" type="text" placeholder="Filter" name="search" onChange={(e) => updateTreeViewer(e.target.value)} />
				</div>

				<div className={`${styles.TreeViewer}`}>
					<TreeView
						className={`${styles.TreeView}`}
						onNodeToggle={handleToggle}
						expanded={expanded}
					>
						<TreeItem nodeId="1" label="Tables">
							{TestTree()}
						</TreeItem>
						<TreeItem nodeId="2" label="Callbacks">
							{TestTree()}
						</TreeItem>
						<TreeItem nodeId="3" label="Classes">
							{TestTree()}
						</TreeItem>
					</TreeView>
				</div>
			</div>
			<div id="overview">
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

				</div>
			</div>
			<div id="editor">
				EDITOR
			</div>
		</div>
	);
}

export default Viewer;
