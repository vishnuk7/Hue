import { sizes } from './sizes';

const styles = {
	Navbar: {
		display: 'flex',
		height: '6vh',
		justifyContent: 'start',
		alignItems: 'center',
	},

	logo: {
		marginRight: '15px',
		padding: '0 20px',
		fontSize: '22px',
		backgroundColor: '#eceff1',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		'& a': {
			textTransform: 'uppercase',
			color: '#000000',
			textDecoration: 'none',
		},
		[sizes.down('xs')]: {
			display: 'none',
		},
	},

	selectContainer: {
		marginLeft: 'auto',
		marginRight: '1rem',
	},

	slider: {
		width: '340px',
		margin: '0 10px',
		display: 'inline-block',
		'& .rc-slider-track': {
			background: 'transparent',
		},
		'& .rc-slider-rail': {
			height: '8px',
		},
		'& .rc-slider-handle, & .rc-slider-handle:hover, & .rc-slider-handle:active & .rc-slider-handle:focus': {
			backgroundColor: '#45a749',
			outline: 'none',
			border: '2px #45a749',
			boxShadow: 'none',
			width: '13px',
			height: '13px',
			marginLeft: '-7px',
			marginTop: '-3px',
		},
		[sizes.down('sm')]: {
			width: '150px',
		},
	},
};

export default styles;
