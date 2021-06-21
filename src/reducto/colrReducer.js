import act from './colrActions'

const initialState = {
	selectedScheme: null,
	schemeList: [],
	isFetching: false,
	schemeViewMode: 'none'
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case act.FETCH_SCHEME_START:
			return {
				...state,
				isFetching: true
			};
		case act.FETCH_SCHEME_SUCCESS:
			return {
				...state,
				isFetching: false,
				selectedScheme: action.payload,
				schemeViewMode: 'single'
			};
		case act.FETCH_LIST_SUCCESS:
			return {
				...state,
				isFetching: false,
				selectedScheme: null,
				schemeList: action.payload,
				schemeViewMode: 'list'
			};
		case act.FETCH_SCHEME_FAIL:
			return {
				...state,
				isFetching: false
			};
		default:
			return state;
	}
};

export default reducer;