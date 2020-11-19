import { DRAWER_WIDTH } from '../constants';

const styles = (theme) => ({
	root: {
		display: 'flex',
		'& h4': {
			marginBottom: '8px',
		},
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${DRAWER_WIDTH}px)`,
		marginLeft: DRAWER_WIDTH,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
	},
	drawer: {
		width: DRAWER_WIDTH,
		flexShrink: 0,
	},
	drawerPaper: {
		width: DRAWER_WIDTH,
		display: 'flex',
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		height: 'calc(100vh - 64px)',
		padding: 0,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -DRAWER_WIDTH,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	container: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttons: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-around',
	},
	button: {
		width: '45%',
	},
});

export default styles;
