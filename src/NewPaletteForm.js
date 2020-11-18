import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';

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
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
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
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	form: {
		display: 'flex',
	},
});

class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20,
	};

	constructor(props) {
		super(props);

		this.handleDrawerClose = this.handleDrawerClose.bind(this);
		this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
		this.updateCurrentColor = this.updateCurrentColor.bind(this);
		this.addNewColor = this.addNewColor.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.savePalette = this.savePalette.bind(this);
		this.removeColor = this.removeColor.bind(this);
		this.onSortEnd = this.onSortEnd.bind(this);
		this.clearPalette = this.clearPalette.bind(this);
		this.addRandomColor = this.addRandomColor.bind(this);

		this.state = {
			open: false,
			currentColor: 'teal',
			newColorName: '',
			colors: this.props.palettes[0].colors,
		};
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			this.state.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.state.colors.every(({ color }) => color !== this.state.currentColor)
		);
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
		);
	}

	handleDrawerOpen() {
		this.setState({ open: true });
	}

	handleDrawerClose() {
		this.setState({ open: false });
	}

	updateCurrentColor(currentColor) {
		this.setState({ currentColor: currentColor.hex });
	}

	addNewColor() {
		const data = {
			name: this.state.newColorName,
			color: this.state.currentColor,
		};

		this.setState({
			newColorName: '',
			colors: [...this.state.colors, data],
		});
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	savePalette(newPaletteName) {
		const newPalette = {
			paletteName: newPaletteName,
			id: newPaletteName.toLowerCase().replace(/ /g, '-'),
			colors: this.state.colors,
		};
		this.props.savePalette(newPalette);
		this.props.history.push('/');
	}

	removeColor(colorName) {
		this.setState({
			colors: this.state.colors.filter(({ name }) => name !== colorName),
		});
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex),
		}));
	};

	clearPalette() {
		this.setState({
			colors: [],
		});
	}

	addRandomColor() {
		const allColors = this.props.palettes.map((p) => p.colors).flat();
		var rand = Math.floor(Math.random() * allColors.length);
		const randColor = allColors[rand];
		this.setState({
			colors: [...this.state.colors, randColor],
		});
	}

	render() {
		const { classes, maxColors } = this.props;
		const { open, currentColor, colors, newColorName } = this.state;
		const isPaletteFull = colors.length >= maxColors;

		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={open}
					classes={classes}
					handleDrawerOpen={this.handleDrawerOpen}
					savePalette={this.savePalette}
				/>
				<Drawer
					className={classes.drawer}
					variant='persistent'
					anchor='left'
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<Typography variant='h4'>Design your palette</Typography>
					<div>
						<Button variant='contained' color='secondary' onClick={this.clearPalette}>
							Clear Palette
						</Button>
						<Button
							variant='contained'
							color='primary'
							onClick={this.addRandomColor}
							disabled={isPaletteFull}>
							Random Color
						</Button>
					</div>
					<ChromePicker
						color={currentColor}
						onChangeComplete={(newColor) => this.updateCurrentColor(newColor)}
					/>
					<ValidatorForm onSubmit={this.addNewColor} className={classes.form}>
						<TextValidator
							label='Color Name'
							name='newColorName'
							onChange={this.handleChange}
							value={newColorName}
							validators={['required', 'isColorNameUnique', 'isColorUnique']}
							errorMessages={[
								'this field is required',
								'color name must be unique',
								'color already exist',
							]}
						/>
						<Button
							type='submit'
							variant='contained'
							style={{ background: isPaletteFull ? '' : currentColor }}
							disabled={isPaletteFull}>
							{isPaletteFull ? 'Palette Full' : 'Add Color'}
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open,
					})}>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={colors}
						removeColor={this.removeColor}
						axis='xy'
						onSortEnd={this.onSortEnd}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
