import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import DargableColorBox from './DargableColorBox';

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
	return (
		<div style={{ height: '100%' }}>
			{colors.map((data, i) => (
				<DargableColorBox
					key={data.name}
					index={i}
					color={data.color}
					name={data.name}
					handleClick={() => removeColor(data.name)}
				/>
			))}
		</div>
	);
});

export default DraggableColorList;
