import React, { Component } from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import MetaPaletteForm from './MetaPaletteForm';

const drawerWidth = 400;

const styles = (theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '64px',
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	navBtns: {
		'& a': {
			textDecoration: 'none',
			color: '#ffffff',
		},
	},
	button: {
		margin: '0 0.5rem',
	},
});

class PaletteFormNav extends Component {
	constructor(props) {
		super(props);
		this.showForm = this.showForm.bind(this);
		this.hideForm = this.hideForm.bind(this);

		this.state = {
			showingForm: false,
		};
	}

	showForm() {
		this.setState({
			showingForm: true,
		});
	}

	hideForm() {
		this.setState({
			showingForm: false,
		});
	}

	render() {
		const { classes, open, handleDrawerOpen, savePalette, palettes } = this.props;
		const { showingForm } = this.state;

		return (
			<div classes={classes.root}>
				<CssBaseline />
				<AppBar
					position='fixed'
					color='default'
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open,
					})}>
					<Toolbar disableGutters={!open}>
						<IconButton
							color='inherit'
							aria-label='Open drawer'
							onClick={handleDrawerOpen}
							className={classNames(classes.menuButton, open && classes.hide)}>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' color='inherit' noWrap>
							Create Palette
						</Typography>
					</Toolbar>
					<div className={classes.navBtns}>
						<Button variant='contained' color='primary' onClick={this.showForm} className={classes.button}>
							Save
						</Button>
						<Button variant='contained' color='secondary' className={classes.button}>
							<Link to='/'>Go Back</Link>
						</Button>
					</div>
				</AppBar>
				{showingForm && (
					<MetaPaletteForm savePalette={savePalette} palettes={palettes} hideForm={this.hideForm} />
				)}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
