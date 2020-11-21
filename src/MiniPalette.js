import React, { PureComponent } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import Avatar from '@material-ui/core/Avatar';

import styles from './styles/MiniPaletteStyles';

class MiniPalette extends PureComponent {
	constructor(props) {
		super(props);
		this.removePalette = this.removePalette.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.confirm = this.confirm.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.state = {
			open: false,
		};
	}

	removePalette(evt) {
		evt.stopPropagation();
		this.setState({
			open: true,
		});
	}
	handleClose(evt) {
		evt.stopPropagation();
		this.setState({
			open: false,
		});
	}

	confirm(evt) {
		evt.stopPropagation();
		this.props.removePalette(this.props.id);
		this.handleClose(evt);
	}

	handleClick() {
		this.props.handleClick(this.props.id);
	}

	render() {
		const { classes, paletteName, emoji, colors } = this.props;
		const { open } = this.state;

		const miniColorBoxes = colors.map((color) => (
			<div className={classes.miniColor} key={color.name} style={{ backgroundColor: color.color }}></div>
		));

		return (
			<div className={classes.root} onClick={this.handleClick}>
				<Dialog onClose={this.handleClose} aria-labelledby='simple-dialog-title' open={open}>
					<DialogTitle id='simple-dialog-title'>Are You Sure?</DialogTitle>
					<List>
						<ListItem button onClick={this.confirm}>
							<ListItemIcon>
								<Avatar className={classes.avatar1}>
									<DoneIcon className={classes.icon1} />
								</Avatar>
							</ListItemIcon>
							<ListItemText primary='Delete' />
						</ListItem>
						<ListItem button onClick={this.handleClose}>
							<ListItemIcon>
								<Avatar className={classes.avatar2}>
									<ClearIcon className={classes.icon2} />
								</Avatar>
							</ListItemIcon>
							<ListItemText primary='Cancel' />
						</ListItem>
					</List>
				</Dialog>

				<div className={classes.delete}>
					<DeleteIcon
						// onClick={this.confirm}
						onClick={this.removePalette}
						className={classes.deleteIcon}
						style={{ transition: 'all 0.3s ease-in-out' }}
					/>
				</div>
				<div className={classes.colors}>{miniColorBoxes}</div>
				<h5 className={classes.title}>
					<span>{paletteName}</span>
					<span className={classes.emoji}>{emoji}</span>
				</h5>
			</div>
		);
	}
}

export default withStyles(styles)(MiniPalette);
