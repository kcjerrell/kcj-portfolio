import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getColorInfo } from '../api/colr';
import { saveColor } from '../reducto/stuff';

const SchemeColorItem = props => {
	const { color } = props;
	const dispatch = useDispatch();
	// const [name, setName] = useState("");

	// useEffect(() => {
	// 	const fetchColorData = async () => {
	// 		if (await color.fetchApiData())
	// 			setName(color.name);
	// 	};

	// 	fetchColorData();
	// }, []);

	//const [colorInfo, setColorInfo] = useState();
	//const [isMouseOver, setIsMouseOver] = useState();

	const onMouseEnter = e => {
		props.onMouseEnter(e);
		//setIsMouseOver(true);
	}

	const onMouseLeave = e => {
		//setIsMouseOver(false);
	}

	const handleClick = e => {
		dispatch(saveColor(color));
	}

	const style = {
		backgroundColor: color.hex,
		color: color.onColor,
		borderTop: `2px solid ${color.highShade}`,
		borderBottom: `2px solid ${color.lowShade}`
	}

	return (
		<div style={style} className={props.className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={handleClick}>
			<h3>{color.hex}</h3>
			{/* {name && <span>{name}</span>} */}
		</div>
	)
}

export default SchemeColorItem;
