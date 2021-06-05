import React from 'react';
import styles from './DocsView.module.scss';
import logo from '../images/logo.png';

import DocsFunc from './functions/DocsFunc';
import DocsJson from '../data/api.0.5.1_658.json';

function class_list_search(elm) {

}

function Namespace(json) {
	
}

function JsonMap(json, func) {
	let result = [];
	let json_keys = Object.keys(json);
	for(let i in json_keys) {
		let ret = func(json_keys[i], json[json_keys[i]]);
		if(ret) result.push(ret);
	}

	return result;
}

var last_func_state;
function filter_elements(filter, namespaceSearch = false) {
	filter = filter.toLowerCase();

	let found = false;
	{
		let list = document.getElementById('class-search-list').childNodes;

		/**
		 * First search through all list items and check if the
		 * search matches any of them
		 */
		 for(let i = 0; i < list.length; i++) {
			let li = list[i];
			let txt = li.innerText;
			if(txt) {
				let enable = txt.toLowerCase().indexOf(filter) > -1;
				if(!namespaceSearch) li.style.display = enable ? '':'none';
				found = found | enable;
			}
		}
	}

	let list = document.getElementById('class-element-list').childNodes;

	if(namespaceSearch) {
		for(let i = 0; i < list.length; i++) {
			let elm = list[i];
			let txt = elm.id;
			if(txt) {
				let enable = txt.toLowerCase().startsWith(filter);
				elm.style.display = enable ? '':'none';
			}
		}

		return;
	}

	if(filter === '' || filter.trim().length < 4 || found) {
		for(let i = 0; i < list.length; i++) {
			list[i].style.display = 'none';
		}

		return;
	}

	if(found) {
		for(let i = 0; i < list.length; i++) {
			let elm = list[i];
			let txt = elm.id;
			if(txt) {
				let enable = txt.toLowerCase().startsWith(filter) > -1;
				elm.style.display = enable ? '':'none';
			}
		}
	} else {
		filter = filter.trim();

		if(filter === '') {
			for(let i = 0; i < list.length; i++) {
				list[i].style.display = 'none';
			}
		} else {
			for(let i = 0; i < list.length; i++) {
				let elm = list[i];
				let txt = elm.id;
				if(txt) {
					let enable = txt.toLowerCase().indexOf(filter) > -1;
					elm.style.display = enable ? '':'none';
				}
			}
		}
	}
}

function DocsView(props) {
	const DocsContent = DocsJson.content;
	
	return (
		<div className={`${styles.Vertical}`}>
			<div className={`${styles.Horizontal}`}>
				<div className={`${styles.SearchCard}`}>
					<img className={`${styles.Logo}`} src={logo} alt="Logo"/>
				</div>
				<div className={`${styles.DocsCardText}`}>
					<p>I'm currently working on making this project more community driven.<br/>
						<a class="pagelink" href="https://github.com/GameDocs/gamedocs.github.io" target="blank">[GitHub Repository]</a>
					</p>
					<p>Special thanks to TechnologicNick for helping me with documentation.<br/>
						<a class="pagelink" href="https://github.com/TechnologicNick" target="blank">[GitHub TechnologicNick]</a>
					</p>
				</div>
			</div>
			<div className={`${styles.Horizontal}`}>
				<div className={`${styles.SearchCard}`}>
					<input className={`${styles.SearchBar}`} id="class-search" placeholder="Search" spellCheck="false" onChange={class_list_search} type="text" onChange={
						(event) => filter_elements(event.target.value)
					}/>
					<ul id="class-search-list" className={`${styles.ClassSearchList}`}>
						{JsonMap(DocsContent, (namespace_name, json) => {
							if(Object.keys(json.tabledata).length === 0
							&& Object.keys(json.userdata).length === 0
							/* Object.keys(json.constants).length === 0 */) {
								return '';
							}

							return (
								<li onClick={() => filter_elements(namespace_name, true)}>{namespace_name}</li>
							);
						})}
					</ul>
				</div>
				<div id="class-element-list" className={`${styles.DocsCard}`}>
					{/* TABLEDATA */}
					{JsonMap(DocsContent, (namespace_name, value) => {
						return JsonMap(value.tabledata, (function_name, value) => {
							return DocsFunc(namespace_name, function_name, value, false);
						});
					})}

					{/* USERDATA */}
					{JsonMap(DocsContent, (namespace_name, value) => {
						return JsonMap(value.userdata, (function_name, value) => {
							return DocsFunc(namespace_name, function_name, value, true);
						});
					})}

					{/* CONSTANTS */}
					{/*<div id="constants">{JsonMap(DocsContent, (key, value) => DocsFunc(key, value, false))}</div>*/}
				</div>
			</div>
		</div>
	);
}

export default DocsView;
