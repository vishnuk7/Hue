import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';

import generatePalette from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.findPalette = this.findPalette.bind(this);
		this.savePalette = this.savePalette.bind(this);

		const savedPalette = JSON.parse(window.localStorage.getItem('palettes'));

		this.state = {
			palettes: savedPalette || seedColors,
		};
	}

	findPalette(id) {
		return this.state.palettes.find((palette) => palette.id === id);
	}

	savePalette(newPalette) {
		this.setState(
			{
				palettes: [...this.state.palettes, newPalette],
			},
			this.syncLocalStorage
		);
	}

	syncLocalStorage() {
		window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
	}

	render() {
		return (
			<Switch>
				<Route
					exact
					path='/'
					render={(routesProps) => <PaletteList {...routesProps} palettes={this.state.palettes} />}
				/>
				<Route
					exact
					path='/palette/new'
					render={(routesProps) => (
						<NewPaletteForm
							{...routesProps}
							savePalette={this.savePalette}
							palettes={this.state.palettes}
						/>
					)}
				/>
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
