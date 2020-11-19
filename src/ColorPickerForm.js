import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.addNewColor = this.addNewColor.bind(this);
		this.updateCurrentColor = this.updateCurrentColor.bind(this);

		this.state = {
			currentColor: 'teal',
			newColorName: '',
		};
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.props.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	addNewColor() {
		const data = {
			name: this.state.newColorName,
			color: this.state.currentColor,
		};
		this.props.addNewColor(data);
	}

	updateCurrentColor(currentColor) {
		this.setState({ currentColor: currentColor.hex });
	}

	render() {
		const { isPaletteFull, classes } = this.props;
		const { currentColor, newColorName } = this.state;
		return (
			<div className={classes.container}>
				<ChromePicker
					className={classes.picker}
					color={currentColor}
					onChangeComplete={(newColor) => this.updateCurrentColor(newColor)}
				/>
				<ValidatorForm onSubmit={this.addNewColor}>
					<TextValidator
						className={classes.colorInput}
						label='Color Name'
						variant='filled'
						margin='normal'
						name='newColorName'
						onChange={this.handleChange}
						value={newColorName}
						validators={['required', 'isColorNameUnique', 'isColorUnique']}
						errorMessages={['this field is required', 'color name must be unique', 'color already exist']}
					/>
					<Button
						type='submit'
						variant='contained'
						style={{ background: isPaletteFull ? '' : currentColor }}
						className={classes.addColor}
						disabled={isPaletteFull}>
						{isPaletteFull ? 'Palette Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ColorPickerForm);
