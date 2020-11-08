import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

export default class ColorBox extends Component {
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
		const { background, name, moreURL, showLink } = this.props;
		const { copied } = this.state;
		const isDark = chroma(background).luminance() <= 0.08;
		const isLight = chroma(background).luminance() >= 0.65;

		console.log(isDark, chroma(background).luminance());
		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div style={{ background }} className='ColorBox'>
					<div style={{ background }} className={`copy-overlay ${copied && 'show'}`} />
					<div className={`copy-msg ${copied && 'show'}`}>
						<h1>Copied!</h1>
						<p>{this.props.background}</p>
					</div>
					<div className='copy-container'>
						<div className='box-content'>
							<span className={isDark && 'text-light'}>{name}</span>
						</div>
						<button className={`copy-btn ${isLight && 'text-dark'}`}>Copy</button>
					</div>
					{showLink && (
						<Link to={moreURL} onClick={(e) => e.stopPropagation()}>
							<span className={`see-more ${isLight && 'text-dark'}`}>More</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}
