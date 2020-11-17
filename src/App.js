import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';

import generatePalette from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

export default class App extends Component {
	findPalette(id) {
		console.log(id);
		return seedColors.find((palette) => palette.id === id);
	}
	render() {
		return (
			<Switch>
				<Route
					exact
					path='/'
					render={(routesProps) => <PaletteList {...routesProps} palettes={seedColors} />}
				/>
				<Route exact path='/palette/new' render={() => <NewPaletteForm />} />
				<Route
					exact
					path='/palette/:id'
					render={(routesProps) => (
						<Palette palette={generatePalette(this.findPalette(routesProps.match.params.id))} />
					)}
				/>
				<Route
					exact
					path='/palette/:paletteId/:colorId'
					render={(routesProps) => (
						<SingleColorPalette
							palette={generatePalette(this.findPalette(routesProps.match.params.paletteId))}
							{...routesProps}
						/>
					)}
				/>
			</Switch>
		);
	}
}
