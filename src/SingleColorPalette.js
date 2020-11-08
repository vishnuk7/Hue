import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
	}

	gatherShades(palette, colorId) {
		let shades = [];
		let allColors = palette.colors;

		for (let key in allColors) {
			shades = shades.concat(allColors[key].filter((color) => color.id === colorId));
		}
		return shades.slice(1);
	}

	changeFormat(val) {
		this.setState({
			format: val,
		});
	}

	render() {
		const { format } = this.state;
		const { palette, emoji, id } = this.props.palette;

		const colorBoxes = this._shades.map((color) => (
			<ColorBox key={color.name} name={color.name} background={color[format]} showLink={false} />
		));
		return (
			<div className='Palette SingleColorPalette'>
				<Navbar changeFormat={this.changeFormat} showAllColors={false} />
				<div className='Palette-colors'>
					{colorBoxes}
					<div className='go-back ColorBox'>
						<Link to={`/palette/${id}`} className='back-btn'>
							Go Back
						</Link>
					</div>
				</div>
				<PaletteFooter name={palette} emoji={emoji} />
			</div>
		);
	}
}
