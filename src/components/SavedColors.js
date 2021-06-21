import { useSelector } from "react-redux"
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
box-sizing:border-box;

  background-color: #222222;



  padding: 0em;

  position: -webkit-sticky;
  position: sticky;
  top: 0;

  z-index: 100;

	&>div {
		width: 1em;
		height: 1em;
		border: 0px white solid;
		margin: .5px;
	}

	&>div:hover {
		width: calc(1em + 6px);
		height: calc(1em + 6px);
		border: 3px solid #00000044;
		/* border: 1px white solid; */
		margin: -5.5px;
		z-index: 10;
		border-radius: 5px;
	}
`;

const SavedColorItem = styled.div`
`;

const SavedColors = props => {
	const colors = useSelector((state) => state.stuff.savedColors);

	const divs = colors.map((c, i) => <div key={i} style={{ backgroundColor: c.hex }} />);

	return (
		<Container>
			{divs}
		</Container>
	)
}

export default SavedColors;
