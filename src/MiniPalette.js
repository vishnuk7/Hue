import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';

import styles from './styles/MiniPaletteStyles';

function MiniPalette(props) {
	const { classes, paletteName, emoji, colors, handleClick } = props;

	const miniColorBoxes = colors.map((color) => (
		<div className={classes.miniColor} key={color.name} style={{ backgroundColor: color.color }}></div>
	));
	return (
		<div className={classes.root} onClick={handleClick}>
			<div className={classes.delete}>
				<DeleteIcon className={classes.deleteIcon} style={{ transition: 'all 0.3s ease-in-out' }} />
			</div>
			<div className={classes.colors}>{miniColorBoxes}</div>
			<h5 className={classes.title}>
				<span>{paletteName}</span>
				<span className={classes.emoji}>{emoji}</span>
			</h5>
		</div>
	);
}

export default withStyles(styles)(MiniPalette);
