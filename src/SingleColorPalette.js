import React, { Component } from 'react';
import ColorBox from './ColorBox';

export default class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this._shades = this.gatherShades(this.props.palette, this.props.match.params.colorId);
		console.dir(this._shades);
	}

	gatherShades(palette, colorId) {
		let shades = [];
		let allColors = palette.colors;

		for (let key in allColors) {
			shades = shades.concat(allColors[key].filter((color) => color.id === colorId));
		}
		return shades;
	}

	render() {
		const colorBoxes = this._shades.map((color) => (
			<ColorBox key={color.id} name={color.name} background={color.hex} showLink={false} />
		));
		return (
			<div className='Palette'>
				<div className='Palette-colors'>{colorBoxes}</div>
			</div>
		);
	}
}
