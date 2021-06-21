import axios from "axios";
import React, { useEffect, useState } from "react"
import { ColourLoversReceiver, getRandomPalette, getRandomPalettes } from "../api/colourLovers";
import Scheme from "../models/Scheme";
import { SchemeListContainer } from '../App'
import SchemeComp from './Scheme';

function clResponse(data) {
	console.log("HEY HERE IT IS");
}

const Scratch = props => {
	const [palettes, setPalettes] = useState([]);


	useEffect(() => {
		getRandomPalettes(5)
			.then(pals => setPalettes(pals));
	}, []);

	return (
		<>
			<div>
				{/* {palettes.map((p, i) => {
					return (
						<div key={i}>
							<span>{p.title}:</span>&nbsp;<span>{p.colors.join(', ')}</span>
						</div>
					);
				})} */}

				{palettes.length > 0 &&
					<SchemeListContainer>
						{palettes.map((pal, i) => <SchemeComp scheme={new Scheme(pal)} mode="item" key={i} />)}
					</SchemeListContainer>
				}

			</div>
		</>
	)
}

export default Scratch;
