import React, { Component } from 'react';

import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';

import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
	goToPalette(id) {
		this.props.history.push(`palette/${id}`);
	}

	render() {
		const { palettes, classes, removePalette } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h4>React Colors</h4>
						<Link to='/palette/new'>Create Palette</Link>
					</nav>

					<div className={classes.palettes}>
						{palettes.map((palette) => (
							<MiniPalette
								key={palette.id}
								{...palette}
								id={palette.id}
								removePalette={removePalette}
								handleClick={() => this.goToPalette(palette.id)}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
