import React, { Component } from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import 'rc-slider/assets/index.css';

import './Navbar.css';

export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			format: 'hex',
		};
	}

	handleChange(evt) {
		this.setState({
			format: evt.target.value,
		});

		this.props.changeFormat(evt.target.value);
	}

	render() {
		const { level, changeLevel } = this.props;
		const { format } = this.state;

		return (
			<header className='Navbar'>
				<div className='logo'>
					<a href='#'>Hue</a>
				</div>
				<div className='slider-container'>
					<span>Level: {level}</span>
					<div className='slider'>
						<Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
					</div>
					<Select value={format} onChange={this.handleChange}>
						<MenuItem value={'hex'}>HEX - #ffffff</MenuItem>
						<MenuItem value={'rgb'}>RGB - rgb(225,225,225)</MenuItem>
						<MenuItem value={'rgba'}>RGBA - rgba(225,225,225,1.0)</MenuItem>
					</Select>
				</div>
			</header>
		);
	}
}
