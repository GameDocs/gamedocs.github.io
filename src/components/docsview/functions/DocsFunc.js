import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../DocsView.module.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function map_json(json, func) {
	let result = [];
	let json_keys = Object.keys(json);
	for(let i in json_keys) {
		let ret = func(json_keys[i], json[json_keys[i]]);
		if(ret) result.push(ret);
	}

	return result;
}

function from_func(func) {
	let result = func();
	return result ? [ result ]:[];
}

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

function StringifyUserListParam(params) {
	if(Object.keys(params).length === 0) return '';

	let result = [];
	let items = Object.keys(params);
	for(let i = 1; i < items.length; i++) {
		let param = params[items[i]];

		if(param.name) {
			result.push(param.name);
		} else if(param.type.length === 1) {
			result.push(param.type[0]);
		} else {
			result.push('[' + param.type + '] ');
		}
	}

	return result.join(', ');
}

const MARKDOWN_LINK_TARGET = (href, children, title) => {
	return href.startsWith('#') ? '':'_blank';
};

function DeclParams(json) {
	let list = map_json(json, (key, param) => {
		let name = param.name;

		if(!name) {
			if(param.type.length === 1) {
				name = param.type[0];
			} else {
				name = 'any';
			}
		}

		return (
			<li className={`${styles.DeclDescriptionParams}`}>
				<span><strong>{name}:</strong>{StringifyParam(param, false)}</span>
				<span className={`${styles.DeclParamDescription}`}><ReactMarkdown linkTarget={MARKDOWN_LINK_TARGET}>{param.description}</ReactMarkdown></span>
			</li>
		);
	});

	if(list.length === 0) return [];

	return (
		<ul>
			{list}
		</ul>
	);
}

function DeclParameters(json) {
	return map_json(json, (key, param) => StringifyParam(param));
}

function DocsFunc(namespace_name, function_name, json, local) {
	let local_id = namespace_name + (local ? ':':'.') + function_name;
	let link_id = local_id.toLowerCase();
	return (
		<div id={link_id} style={{ "display": "none" }} className={`${styles.DeclFunction}`}><br/><br/>
			<dl>
				<dt className={`${styles.DeclHeader} ${local ? styles.Userdata:styles.Tabledata}`}>
					<span className={`${styles.DeclSeparator}`}><code className={`${styles.DeclSandbox}`}>{json.sandbox}</code></span>
					<span className={`${styles.DeclSeparator}`}><code className={`${styles.DeclName}`}>{local ? function_name:local_id}</code></span>
					<span className={`${styles.DeclSeparator}`}><span className={`${styles.DeclParameters}`}>{DeclParameters(json.params)}</span></span>
					<CopyToClipboard text={window.location.href.replace(new RegExp(window.location.hash, 'g'), '') + '#' + link_id} onCopy={() => {
						window.location.hash = '#'
						window.location.hash = '#' + link_id;
					}}><span className={`${styles.DeclLink}`}></span></CopyToClipboard>
				</dt>
				<dd>
					<p className={`${styles.DeclDescription}`}>
						<ReactMarkdown linkTarget={MARKDOWN_LINK_TARGET}>{json.description}</ReactMarkdown>

						{local ? from_func(() => {
							let ns_name = namespace_name.substr(namespace_name.lastIndexOf('.') + 1);
							return (
								<div>
									<p>Example Usage:</p>
									<pre>variable_{ns_name}:{function_name}({StringifyUserListParam(json.params)});</pre>
								</div>
							);
						}):''}
					</p>
					<table className={`${styles.DeclTables}`}>
						<tbody>
							{from_func(() => {
								if(Object.keys(json.params).length === 0) return '';
								return (<tr><th>Parameters:</th><td>{DeclParams(json.params)}</td></tr>);
							})}
							{from_func(() => {
								if(Object.keys(json.returns).length === 0) return '';
								return (<tr><th>Returns:</th><td>{DeclParams(json.returns)}</td></tr>);
							})}
						</tbody>
					</table>
				</dd>
			</dl>
		</div>
	);
}

export default DocsFunc;
