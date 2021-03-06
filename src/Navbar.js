import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles/NavBarStyles';
import { withStyles } from '@material-ui/styles';

import 'rc-slider/assets/index.css';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.closeSnackBar = this.closeSnackBar.bind(this);

		this.state = {
			format: 'hex',
			open: false,
		};
	}

	handleChange(evt) {
		this.setState({
			format: evt.target.value,
			open: true,
		});

		this.props.changeFormat(evt.target.value);
	}

	closeSnackBar() {
		console.log('hello');
		this.setState({ open: true });
	}

	render() {
		const { level, changeLevel, showAllColors, classes } = this.props;
		const { format, open } = this.state;

		return (
			<header className={classes.Navbar}>
				<div className={classes.logo}>
					<Link to='/'>Hue</Link>
				</div>
				{showAllColors && (
					<div>
						<span>Level: {level}</span>
						<div className={classes.slider}>
							<Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
						</div>
					</div>
				)}
				<div className={classes.selectContainer}>
					<Select value={format} onChange={this.handleChange}>
						<MenuItem value={'hex'}>HEX - #ffffff</MenuItem>
						<MenuItem value={'rgb'}>RGB - rgb(225,225,225)</MenuItem>
						<MenuItem value={'rgba'}>RGBA - rgba(225,225,225,1.0)</MenuItem>
					</Select>
				</div>
				<Snackbar
					open={open}
					autoHideDuration={3000}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					message={<span id='message-id'>Format Changed to {format.toUpperCase()}!</span>}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					action={[
						<IconButton onClick={this.closeSnackBar} color='inherit' key='close' aria-label='close'>
							<CloseIcon />
						</IconButton>,
					]}
				/>
			</header>
		);
	}
}

export default withStyles(styles)(Navbar);
