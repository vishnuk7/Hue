import React, { Component } from 'react';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Navbar from './Navbar';

export default class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this.changeFormat = this.changeFormat.bind(this);

		this._shades = this.gatherShades(this.props.palette, this.props.match.params.colorId);
		this.state = {
			format: 'hex',
		};

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

	changeFormat(val) {
		this.setState({
			format: val,
		});
	}

	render() {
		const { format } = this.state;
		const { palette, emoji } = this.props.palette;

		const colorBoxes = this._shades.map((color) => (
			<ColorBox key={color.id} name={color.name} background={color[format]} showLink={false} />
		));
		return (
			<div className='Palette'>
				<Navbar changeFormat={this.changeFormat} showAllColors={false} />
				<div className='Palette-colors'>{colorBoxes}</div>
				<PaletteFooter name={palette} emoji={emoji} />
			</div>
		);
	}
}
