import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 400;

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

class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20,
	};

	constructor(props) {
		super(props);

		this.handleDrawerClose = this.handleDrawerClose.bind(this);
		this.handleDrawerOpen = this.handleDrawerOpen.bind(this);

		this.addNewColor = this.addNewColor.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.savePalette = this.savePalette.bind(this);
		this.removeColor = this.removeColor.bind(this);
		this.onSortEnd = this.onSortEnd.bind(this);
		this.clearPalette = this.clearPalette.bind(this);
		this.addRandomColor = this.addRandomColor.bind(this);

		this.state = {
			open: false,
			colors: this.props.palettes[0].colors,
		};
	}

	handleDrawerOpen() {
		this.setState({ open: true });
	}

	handleDrawerClose() {
		this.setState({ open: false });
	}

	addNewColor(data) {
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
		const { classes, maxColors, palettes } = this.props;
		const { open, colors } = this.state;
		const isPaletteFull = colors.length >= maxColors;

		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={open}
					handleDrawerOpen={this.handleDrawerOpen}
					savePalette={this.savePalette}
					palettes={palettes}
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
					<div className={classes.container}>
						<Typography variant='h4'>Design your palette</Typography>
						<div className={classes.buttons}>
							<Button
								className={classes.button}
								variant='contained'
								color='secondary'
								onClick={this.clearPalette}>
								Clear Palette
							</Button>
							<Button
								className={classes.button}
								variant='contained'
								color='primary'
								onClick={this.addRandomColor}
								disabled={isPaletteFull}>
								Random Color
							</Button>
						</div>
						<ColorPickerForm isPaletteFull={isPaletteFull} colors={colors} addNewColor={this.addNewColor} />
					</div>
					S
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
