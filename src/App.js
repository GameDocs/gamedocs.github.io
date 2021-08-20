import './App.css';
import { Route, Switch, Link } from "react-router-dom";
import DocsView from './components/docsview/DocsView';
import Viewer from './components/viewer/Viewer';
import Navbar from './components/navbar/Navbar';
import NavItem from './components/navbar/NavItem';

function App() {
	return (
		<div className="App">
			<Navbar>
				<NavItem name="Documentation" path="/"/>
				<NavItem name="Editor" path="/edit"/>
				<NavItem name="Test" path="/test"/>
			</Navbar>

			<Switch>
				<Route path="/test">
					<Viewer/>
				</Route>
				<Route path="/edit">
					DocsEditor TEST!!!!
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

