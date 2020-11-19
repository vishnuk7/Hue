import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

export default class MetaPaletteForm extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			open: true,
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
		const { open, newPaletteName } = this.state;
		const { savePalette, hideForm } = this.props;

		return (
			<Dialog open={open} aria-labelledby='form-dialog-title' onClose={hideForm}>
				<DialogTitle id='form-dialog-title'>Choose a Palette Name</DialogTitle>
				<ValidatorForm onSubmit={() => savePalette(newPaletteName)}>
					<DialogContent>
						<DialogContentText>
							Please Enter a name for your new beautiful palette.Make sure it's unique!
						</DialogContentText>
						<Picker />
						<TextValidator
							label='Palette Name'
							name='newPaletteName'
							value={newPaletteName}
							onChange={this.handleChange}
							fullWidth
							margin='normal'
							validators={['required', 'isPaletteNameUnique']}
							errorMessages={['palette name is required', 'this palette name is already used']}
						/>
					</DialogContent>

					<DialogActions>
						<Button onClick={hideForm} color='primary'>
							Cancel
						</Button>
						<Button variant='contained' color='primary' type='submit'>
							Save Palette
						</Button>
					</DialogActions>
				</ValidatorForm>
			</Dialog>
		);
	}
}
