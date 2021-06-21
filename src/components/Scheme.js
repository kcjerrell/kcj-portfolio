import React, { useState } from 'react';
import styled from 'styled-components';
import SchemeColorItem from './SchemeColorItem';

const BgScheme = styled.div`
	position: absolute;

	left: 0;
	top: 0;
	right: 0;
	bottom: 0;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: stretch;

	z-index: -10;

	.bg-scheme-color {
		flex-grow: 1;

		display: flex;
		flex-direction: column-reverse;
	}
`;

const ItemScheme = styled.div`
	min-width: 12.5em;
	height: 15em;
	margin: 1.5em;

	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: stretch;

	flex-grow: 1;

	position: relative;

	border: 2px solid #aaaaaa;

	overflow: clip;
	border-radius: 8px;
	box-shadow: 0px 0px 48px -5px #000000;

	.label {
		position: absolute;
		bottom: 0;
		margin: 1.5em;
		padding: .5em 1em;
		border-radius: 3px 10px 3px 10px;
		border: 3px solid #00000044;
		font-size: 1.2em;
		font-weight: 500;
		letter-spacing: .05em;
		box-shadow: 1px 1px 20px -3px #000000BB;
	}

	.color-container {
		display: flex;
		align-items: stretch;
		flex-direction: row;
		flex-grow: 1;
		border-style: solid;
		border-width: 0px;

		.item-scheme-color {
			flex-grow: 1;
			width: 4em;
			display: flex;
			flex-direction: column;
			justify-content: center;

				writing-mode: vertical-rl;
				text-orientation: sideways;

			h3 {
				display: none;
				opacity: .35;
				margin: auto 0;
				font-size: 2.5em;
				font-family: monospace;
				text-transform: lowercase;
			}
		}

		.item-scheme-color:hover {
			h3 {
				display: block;
			}
		}
	}
`;

// A Scheme is basically a collection of colors
// A Scheme component is a collection of Color components
/**
 * @property {string} mode
 * @param {any} props
 * @returns
 */
const Scheme = props => {
	const { scheme, mode } = props;
	const { colors } = scheme;
	// const [colorHovered, setColorHovered] = useState(colors[0]);
	// const [state, setState] = useState({ a: 0, b: 0 });
	//const [isLabelOnRight, setIsLabelOnRight] = useState(true);
	//const labelColor = isLabelOnRight ? colors[0] : colors[colors.length - 1];

	const [labelOptions, setLabelOptions] = useState({ isOnRight: true, color: colors[0] });

	const isBackground = mode === "background";
	const childClass = isBackground ? "bg-scheme-color" : "item-scheme-color";

	const childHover = i => {
		const handleMouseEnter = e => {
			const onRight = i <= colors.length / 2;
			if (labelOptions.isOnRight !== onRight || labelOptions.color !== colors[i])
				setLabelOptions({ isOnRight: onRight, color: colors[i] });
		}
		return handleMouseEnter;
	};

	const colorDivs = colors.map((col, i) => <SchemeColorItem color={col} key={i} className={childClass} onMouseEnter={childHover(i)} borderColor={labelOptions.color.hex} />);

	// I keep going back on forth on whether I should use inline styles or inject into the styled componenets
	// the former makes the most sense though, because otherwise it makes a new css class for every single color

	const labelStyle = {
		backgroundColor: labelOptions.color.hex,
		color: labelOptions.color.onColor,
		right: labelOptions.isOnRight ? 0 : "unset",
		left: labelOptions.isOnRight ? "unset" : 0,
		textShadow: `2px 0px 10px ${labelOptions.color.onColor === '#FFFFFF' ? '#00000088' : '#FFFFFF88'}`,
	};

	return (
		<>
			{isBackground &&
				<BgScheme>
					{colorDivs}
				</BgScheme>
			}

			{!isBackground &&
				<ItemScheme a={props.a} b={props.b}>
					<div className="color-container">
						{colorDivs}
					</div>
					<span className="label" style={labelStyle}>
						{scheme.name}
					</span>
				</ItemScheme>
			}
		</>
	);
}

export default Scheme;
