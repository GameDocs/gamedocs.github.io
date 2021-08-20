import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ReactGA from 'react-ga';
ReactGA.initialize('G-6MB8J33CS7');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
	<React.StrictMode>
		<HashRouter hashType="noslash">
			<App />
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
