import React, { Component } from 'react';

import Navbar from './Navbar';

import ColorBox from './ColorBox';

import './Palette.css';

export default class Palette extends Component {
	constructor(props) {
		super(props);
		this.changeLevel = this.changeLevel.bind(this);

		this.state = { level: 500 };
	}

	changeLevel(level) {
		console.log(level);
		this.setState({
			level,
		});
	}

	render() {
		const { level } = this.state;
		const { colors } = this.props.palette;

		const colorBoxes = colors[level].map((color) => <ColorBox background={color.hex} name={color.name} />);

		return (
			<div className='Palette'>
				<Navbar level={level} changeLevel={this.changeLevel} />
				<div className='Palette-colors'>{colorBoxes}</div>
			</div>
		);
	}
}
