import React from 'react';

export default function PaletteFooter(props) {
	const { name, emoji } = props;
	return (
		<div>
			<footer className='palette-footer'>
				{name}
				<span className='emoij'>{emoji}</span>
			</footer>
		</div>
	);
}
