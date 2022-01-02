import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import DocsView from './components/docsview/DocsView';
import Viewer from './components/viewer/Viewer';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/neweditor">
					<Viewer/>
				</Route>
				<Route>
					<div className="AppBody">
						<DocsView/>
					</div>
				</Route>
			</Switch>
		</div>
	);
}

export default App;