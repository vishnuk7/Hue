import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		backgroundColor: '#ffffff',
		borderRadius: '5px',
		padding: '0.5rem',
		overflow: 'hidden',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	colors: {},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 0,
		color: '#000000',
		paddingTop: '0.5rem',
		fontSize: '1rem',
		position: 'relative',
	},
	emoji: {
		marginLeft: '0.5rem',
		fontSize: '1.5rem',
	},
};

function MiniPalette(props) {
	const { classes, paletteName, emoji } = props;
	return (
		<div className={classes.root}>
			<div className={classes.colors} />
			<h5 className={classes.title}>
				<span>{paletteName}</span>
				<span className={classes.emoji}>{emoji}</span>
			</h5>
		</div>
	);
}

export default withStyles(styles)(MiniPalette);
