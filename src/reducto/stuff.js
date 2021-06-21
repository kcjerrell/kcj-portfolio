export const SAVE_COLOR = "SAVE_COLOR";

export const saveColor = (color) => {
	return { type: SAVE_COLOR, payload: color };
};

const initialState = {
	savedColors: [],
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_COLOR:
			return {
				...state,
				savedColors: [...state.savedColors, action.payload]
			}

		default:
			return state;
	}
};
