import './App.css';
import DocsView from './components/docsview/DocsView';
import Navbar from './components/navbar/Navbar';

function App() {
	return (
		<div className="App">
			<Navbar/>
			<div className="AppBody">
				<DocsView/>
			</div>
		</div>
	);
}

export default App;

