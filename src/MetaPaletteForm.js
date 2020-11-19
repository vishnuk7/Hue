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
		this.showEmojiPicker = this.showEmojiPicker.bind(this);
		this.savePalette = this.savePalette.bind(this);

		this.state = {
			stage: 'form',
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

	showEmojiPicker() {
		this.setState({
			stage: 'emoji',
		});
	}

	savePalette(emoji) {
		const newPalette = {
			paletteName: this.state.newPaletteName,
			emoji: emoji.native,
		};
		this.props.savePalette(newPalette);
	}

	render() {
		const { stage, newPaletteName } = this.state;
		const { hideForm } = this.props;

		return (
			<div>
				<Dialog open={stage === 'emoji'} onClose={hideForm}>
					<DialogTitle id='form-dialog-title'>Choose an emoji</DialogTitle>
					<Picker onSelect={this.savePalette} />
				</Dialog>
				<Dialog open={stage === 'form'} aria-labelledby='form-dialog-title' onClose={hideForm}>
					<DialogTitle id='form-dialog-title'>Choose a Palette Name</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText>
								Please Enter a name for your new beautiful palette.Make sure it's unique!
							</DialogContentText>

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
			</div>
		);
	}
}
