import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Navbar from './Navbar';
import { withStyles } from '@material-ui/styles';

const styles = {
	singleColorPalette: {
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
	},
	colors: {
		height: '90%',
	},
	goBack: {
		backgroundColor: '#000000',
		width: '20%',
		height: '50%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-3.5px',
	},
	backBtn: {
		width: '100px',
		height: '30px',
		position: 'absolute',
		display: 'inline-block',
		top: '50%',
		left: '50%',
		marginLeft: '-50px',
		marginTop: '-15px',
		textAlign: 'center',
		outline: 'none',
		background: 'rgba(255, 255, 255, 0.3)',
		fontSize: '1rem',
		lineHeight: '30px',
		textTransform: 'uppercase',
		border: 'none',
		textDecoration: 'none',
		color: '#ffffff',
	},
};

class SingleColorPalette extends Component {
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
		const { classes } = this.props;

		const colorBoxes = this._shades.map((color) => (
			<ColorBox key={color.name} name={color.name} background={color[format]} showingFullPalette={false} />
		));
		return (
			<div className={classes.singleColorPalette}>
				<Navbar changeFormat={this.changeFormat} showAllColors={false} />
				<div className={classes.colors}>
					{colorBoxes}
					<div className={classes.goBack}>
						<Link to={`/palette/${id}`} className={classes.backBtn}>
							Go Back
						</Link>
					</div>
				</div>
				<PaletteFooter name={palette} emoji={emoji} />
			</div>
		);
	}
}
export default withStyles(styles)(SingleColorPalette);
