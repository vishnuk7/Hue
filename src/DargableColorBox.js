import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		width: '20%',
		height: '25%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-5.5px',
	},
};

function DargableColorBox(props) {
	const { color, classes } = props;

	return <div className={classes.root} style={{ backgroundColor: color }}></div>;
}

export default withStyles(styles)(DargableColorBox);
