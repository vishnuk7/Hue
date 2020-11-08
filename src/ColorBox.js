import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

const styles = {
	copyText: {
		color: (props) => (chroma(props.background).luminance() >= 0.65 ? 'rgba(0, 0, 0, 0.7)' : '#ffffff'),
	},
	colorName: {
		color: (props) => (chroma(props.background).luminance() <= 0.08 ? '#ffffff' : 'rgba(0, 0, 0, 0.7)'),
	},
	seeMore: {
		background: 'rgba(225, 255, 255, 0.3)',
		position: 'absolute',
		right: '0px',
		bottom: '0px',
		height: '30px',
		width: '60px',
		textAlign: 'center',
		color: (props) => (chroma(props.background).luminance() >= 0.65 ? 'rgba(0, 0, 0, 0.7)' : '#ffffff'),
		lineHeight: '30px',
		textTransform: 'uppercase',
	},
	copyMsgColor: {
		color: (props) => (chroma(props.background).luminance() >= 0.65 ? 'rgba(0, 0, 0, 0.7)' : '#ffffff'),
	},
};

class ColorBox extends Component {
	constructor(props) {
		super(props);
		this.changeCopyState = this.changeCopyState.bind(this);

		this.state = { copied: false };
	}

	changeCopyState() {
		this.setState({ copied: true }, () => {
			setTimeout(() => {
				this.setState({ copied: false });
			}, 1500);
		});
	}

	render() {
		const { classes, background, name, moreURL, showLink } = this.props;
		const { copied } = this.state;

		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div style={{ background }} className='ColorBox'>
					<div style={{ background }} className={`copy-overlay ${copied && 'show'}`} />
					<div className={`copy-msg ${copied && 'show'} ${classes.copyMsgColor}`}>
						<h1>Copied!</h1>
						<p>{this.props.background}</p>
					</div>
					<div className='copy-container'>
						<div className='box-content'>
							<span className={classes.colorName}>{name}</span>
						</div>
						<button className={`copy-btn ${classes.copyText}`}>Copy</button>
					</div>
					{showLink && (
						<Link to={moreURL} onClick={(e) => e.stopPropagation()}>
							<span className={classes.seeMore}>More</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default withStyles(styles)(ColorBox);
