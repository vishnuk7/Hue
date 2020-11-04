import React, { Component } from 'react';

import Navbar from './Navbar';

import ColorBox from './ColorBox';

import './Palette.css';

export default class Palette extends Component {
	constructor(props) {
		super(props);
		this.changeLevel = this.changeLevel.bind(this);
		this.changeFormat = this.changeFormat.bind(this);

		this.state = { level: 500, format: 'hex' };
	}

	changeLevel(level) {
		this.setState({
			level,
		});
	}

	changeFormat(value) {
		this.setState({
			format: value,
		});
	}

	render() {
		const { level, format } = this.state;
		const { colors } = this.props.palette;

		const colorBoxes = colors[level].map((color) => <ColorBox background={color[format]} name={color.name} />);

		return (
			<div className='Palette'>
				<Navbar level={level} changeLevel={this.changeLevel} changeFormat={this.changeFormat} />
				<div className='Palette-colors'>{colorBoxes}</div>
			</div>
		);
	}
}
