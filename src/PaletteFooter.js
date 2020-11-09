import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteFooterStyles';

function PaletteFooter(props) {
	const { name, emoji, classes } = props;
	return (
		<div>
			<footer className={classes.paletteFooter}>
				{name}
				<span className={classes.emoij}>{emoji}</span>
			</footer>
		</div>
	);
}

export default withStyles(styles)(PaletteFooter);
