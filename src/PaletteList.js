import { Palette } from '@material-ui/icons';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		background: 'blue',
		height: '100%',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	container: {
		width: '50%',
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
		flexWrap: 'wrap',
	},
	nav: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		color: '#ffffff',
	},
	palettes: {
		boxSizing: 'border-box',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 30%)',
		gridGap: '5%',
	},
};

class PaletteList extends Component {
	render() {
		const { palettes, classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h4>React Colors</h4>
					</nav>

					<div className={classes.palettes}>
						{palettes.map((palette) => (
							<MiniPalette {...palette} />
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
