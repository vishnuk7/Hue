const styles = {
	root: {
		width: '20%',
		height: '25%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-5.5px',
		'& svg:hover': {
			color: '#ffffff',
			transform: 'scale(1.5)',
		},
	},
	boxContent: {
		position: 'absolute',
		width: '100%',
		left: '0px',
		bottom: '0px',
		padding: '10px',
		color: 'black',
		letterSpacing: '1px',
		textTransform: 'uppercase',
		fontSize: '12px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	deleteIcon: {
		color: 'rgba(0,0,0,0.5)',
		transition: 'all 0.2s ease-in-out',
	},
};

export default styles;
