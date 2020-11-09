import React, { Component } from 'react';

import Navbar from './Navbar';

import ColorBox from './ColorBox';

import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';

import styles from './styles/PaletteStyles';

class Palette extends Component {
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
		const { colors, palette, emoji, id } = this.props.palette;
		const { classes } = this.props;

		const colorBoxes = colors[level].map((color) => (
			<ColorBox
				background={color[format]}
				name={color.name}
				key={id}
				moreURL={`/palette/${id}/${color.id}`}
				showingFullPalette={true}
			/>
		));

		return (
			<div className={classes.palette}>
				<Navbar
					level={level}
					changeLevel={this.changeLevel}
					changeFormat={this.changeFormat}
					showAllColors={true}
				/>
				<div className={classes.colors}>{colorBoxes}</div>
				<PaletteFooter name={palette} emoji={emoji} />
			</div>
		);
	}
}
export default withStyles(styles)(Palette);
