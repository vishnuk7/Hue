import { Route, Switch } from 'react-router-dom';

import Palette from './Palette';
import seedColors from './seedColors';

import generatePalette from './colorHelpers';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route extact path='/' />
				<Route extact path='/palette/:id' />
			</Switch>
			<Palette palette={generatePalette(seedColors[2])} />
		</div>
	);
}

export default App;
