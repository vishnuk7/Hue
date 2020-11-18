import React, { Component } from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class PaletteFormNav extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			newPaletteName: '',
		};
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
		);
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	render() {
		const { classes, open, handleDrawerOpen, savePalette, palettes } = this.props;
		const { newPaletteName } = this.state;
		return (
			<div>
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
							Persistent drawer
						</Typography>
						<ValidatorForm onSubmit={() => savePalette(newPaletteName)}>
							<TextValidator
								label='Palette Name'
								name='newPaletteName'
								value={newPaletteName}
								onChange={this.handleChange}
								validators={['required', 'isPaletteNameUnique']}
								errorMessages={['palette name is required', 'this palette name is already used']}
							/>
							<Button variant='contained' color='primary' type='submit'>
								Save Palette
							</Button>
						</ValidatorForm>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}
