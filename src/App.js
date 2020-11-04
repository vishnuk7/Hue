import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';

import generatePalette from './colorHelpers';

export default class App extends Component {
	findPalette(id) {
		console.log(id);
		return seedColors.find((palette) => palette.id === id);
	}
	render() {
		return (
			<Switch>
				<Route exact path='/' render={() => <PaletteList palettes={seedColors} />} />

				<Route
					exact
					path='/palette/:id'
					render={(routesProps) => (
						<Palette palette={generatePalette(this.findPalette(routesProps.match.params.id))} />
					)}
				/>
			</Switch>
		);
	}
}
