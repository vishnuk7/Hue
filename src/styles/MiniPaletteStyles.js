import { blue, red } from '@material-ui/core/colors';

const styles = {
	root: {
		backgroundColor: '#ffffff',
		borderRadius: '5px',
		padding: '0.5rem',
		overflow: 'hidden',
		cursor: 'pointer',
		'&:hover svg': {
			opacity: 1,
		},
	},
	colors: {
		backgroundColor: '#dae1e4',
		height: '150px',
		width: '100%',
		borderRadius: '5px',
		overflow: 'hidden',
	},
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
	miniColor: {
		height: '25%',
		width: '20%',
		display: 'inline-block',
		margin: '0 auto',
		position: 'relative',
		marginBottom: '-4.5px',
	},
	delete: {
		position: 'relative',
	},
	deleteIcon: {
		color: '#ffffff',
		backgroundColor: '#eb3d30',
		width: '20px',
		height: '20px',
		position: 'absolute',
		right: '0px',
		top: '0px',
		padding: '10px',
		zIndex: 10,
		opacity: 0,
	},
	item1: {
		backgroundColor: blue[100],
		color: blue[700],
	},
	item2: {
		backgroundColor: red[100],
		color: red[700],
	},
	avatar1: {
		backgroundColor: blue[200],
	},
	avatar2: {
		backgroundColor: red[200],
	},
	icon1: {
		color: blue[500],
	},
	icon2: {
		color: red[500],
	},
};

export default styles;
