import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../DocsView.module.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function StringifyParam(param, key, allowName = true) {
	if(param.name && allowName) {
		return (<code key={`${key}`} className={`${styles.DeclParam}`}>{param.name}</code>);
	}
	
	if(param.type.length === 1) {
		return (<code key={`${key}`} className={`${styles.DeclParam}`}>{param.type[0]}</code>);
	}

	return (
		<code key={`${key}`} className={`${styles.DeclParamTable}`}>
			{param.type.map((value, idx) => {
				return (<code key={`${idx}`} className={`${styles.DeclParam}`}>{value}</code>);
			})}
		</code>
	);
}

function StringifyUserListParam(params) {
	if(params.length === 0) return '';

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
	return (
		<ul>
			{json.map((param, index) => {
				let name = param.name;

				if(!name) {
					if(param.type.length === 1) {
						name = param.type[0];
					} else {
						name = 'any';
					}
				}
		
				return (
					<li key={`${index}`} className={`${styles.DeclDescriptionParams}`}>
						<span><strong>{name}:</strong>{StringifyParam(param, index, false)}</span>
						<span className={`${styles.DeclParamDescription}`}><ReactMarkdown linkTarget={MARKDOWN_LINK_TARGET}>{param.description}</ReactMarkdown></span>
					</li>
				);
			})}
		</ul>
	);
}

function DeclParameters(json) {
	return json.map((param, index) => StringifyParam(param, index));
}

function DocsFunc_Params(json) {
	if(json.params.length === 0) return null;
	return (
		<tr>
			<th>Parameters:</th>
			<td>{DeclParams(json.params)}</td>
		</tr>
	);
}

function DocsFunc_Returns(json) {
	if(json.returns.length === 0) return null;
	return (
		<tr>
			<th>Returns:</th>
			<td>{DeclParams(json.returns)}</td>
		</tr>
	);
}

function DocsFunc(namespace_name, function_name, json, local) {
	let local_id = namespace_name + (local ? ':':'.') + function_name;
	let link_id = local_id.toLowerCase();

	let ns_name = namespace_name.substr(namespace_name.lastIndexOf('.') + 1);
	let fn_name = local ? ('<' + ns_name.substr(0, 1).toUpperCase() + ns_name.substr(1) + '>:' + function_name):local_id;

	return (
		<div key={`${link_id}`} id={link_id} style={{display: 'none'}} className={`${styles.DeclFunction}`}><br/><br/>
			<dl>
				<dt className={`${styles.DeclHeader} ${local ? styles.Userdata:styles.Tabledata}`}>
					<span className={`${styles.DeclSeparator}`}><code className={`${styles.DeclSandbox}`}>{json.sandbox}</code></span>
					<span className={`${styles.DeclSeparator}`}><code className={`${styles.DeclName}`}>{fn_name}</code></span>
					<span className={`${styles.DeclSeparator}`}><span className={`${styles.DeclParameters}`}>{DeclParameters(json.params)}</span></span>
					<CopyToClipboard text={window.location.href.replace(new RegExp(window.location.hash, 'g'), '') + '#' + link_id} onCopy={() => {
						window.location.hash = '#'
						window.location.hash = '#' + link_id;
					}}><span className={`${styles.DeclLink}`}></span></CopyToClipboard>
				</dt>
				<dd>
					<div className={`${styles.DeclDescription}`}>
						<ReactMarkdown linkTarget={MARKDOWN_LINK_TARGET}>{json.description}</ReactMarkdown>

						{local ? (
							<div>
								<p>Example Usage:</p>
								<pre>variable_{ns_name}:{function_name}({StringifyUserListParam(json.params)});</pre>
							</div>
						):null}
					</div>
					<table className={`${styles.DeclTables}`}>
						<tbody>
							{DocsFunc_Params(json)}
							{DocsFunc_Returns(json)}
						</tbody>
					</table>
				</dd>
			</dl>
		</div>
	);
}

export default DocsFunc;
