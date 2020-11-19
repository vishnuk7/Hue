import React, { Component } from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import MetaPaletteForm from './MetaPaletteForm';
import styles from './styles/PaletteFormNavStyles';

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
							<LibraryAddIcon />
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
