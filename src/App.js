import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';

import generatePalette from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.findPalette = this.findPalette.bind(this);
		this.savePalette = this.savePalette.bind(this);
		this.removePalette = this.removePalette.bind(this);

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

	removePalette(id) {
		this.setState(
			(st) => ({
				palettes: st.palettes.filter((palette) => palette.id !== id),
			}),
			this.syncLocalStorage
		);
	}

	syncLocalStorage() {
		window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
	}

	render() {
		return (
			<Route
				render={({ location }) => (
					<TransitionGroup>
						<CSSTransition key={location.key} classNames='page'>
							<Switch location={location}>
								<Route
									exact
									path='/'
									render={(routesProps) => (
										<Page>
											<PaletteList
												{...routesProps}
												palettes={this.state.palettes}
												removePalette={this.removePalette}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/palette/new'
									render={(routesProps) => (
										<Page>
											<NewPaletteForm
												{...routesProps}
												savePalette={this.savePalette}
												palettes={this.state.palettes}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/palette/:id'
									render={(routesProps) => (
										<Page>
											<Palette
												palette={generatePalette(this.findPalette(routesProps.match.params.id))}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/palette/:paletteId/:colorId'
									render={(routesProps) => (
										<Page>
											<SingleColorPalette
												palette={generatePalette(
													this.findPalette(routesProps.match.params.paletteId)
												)}
												{...routesProps}
											/>
										</Page>
									)}
								/>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}></Route>
		);
	}
}
