import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

class PaletteList extends Component {
	constructor(props) {
		super(props);
		this.goToPalette = this.goToPalette.bind(this);
	}
	goToPalette(id) {
		this.props.history.push(`palette/${id}`);
	}

	render() {
		const { palettes, classes, removePalette } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h4 className={classes.heading}>Hue</h4>
						<Link to='/palette/new'>Create Palette</Link>
					</nav>

					<TransitionGroup className={classes.palettes}>
						{palettes.map((palette) => (
							<CSSTransition key={palette.id} classNames='fade' timeout={500}>
								<MiniPalette
									key={palette.id}
									{...palette}
									id={palette.id}
									removePalette={removePalette}
									handleClick={this.goToPalette}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
