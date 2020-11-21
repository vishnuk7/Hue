import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Navbar from './Navbar';
import { styles } from './styles/SingleColorPaletteStyles';

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
