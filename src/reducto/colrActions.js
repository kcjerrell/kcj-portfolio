import { getRandomSchemes } from "../api/colr";

export const FETCH_SCHEME_START = "FETCH_SCHEME_START";
export const FETCH_SCHEME_SUCCESS = "FETCH_SCHEME_SUCCESS";
export const FETCH_SCHEME_FAIL = "FETCH_SCHEME_FAIL";
export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";

export const fetchSchemeStart = () => {
	return { type: FETCH_SCHEME_START };
}

export const fetchSchemeSuccess = (data) => {
	return { type: FETCH_SCHEME_SUCCESS, payload: data };
}

export const fetchSchemeFail = (data) => {
	return { type: FETCH_SCHEME_FAIL, payload: data };
}

export const fetchListSuccess = (data) => {
	return { type: FETCH_LIST_SUCCESS, payload: data };
}

export const fetchScheme = () => {
	return async dispatch => {
		dispatch(fetchSchemeStart());

		try {
			const schemes = await getRandomSchemes(5);
			dispatch(fetchSchemeSuccess(schemes[0]));
		}

		catch (error) {
			console.log(error);
			dispatch(fetchSchemeFail(error));
		}
	};
};

export const listSchemes = () => {
	return async dispatch => {
		dispatch(fetchSchemeStart());

		try {
			const schemes = await getRandomSchemes(30);
			dispatch(fetchListSuccess(schemes));
		}

		catch (error) {
			console.log(error);
			dispatch(fetchSchemeFail(error));
		}
	}
}


const colr = {
	FETCH_SCHEME_START, fetchSchemeStart,
	FETCH_SCHEME_SUCCESS, fetchSchemeSuccess,
	FETCH_SCHEME_FAIL, fetchSchemeFail,
	FETCH_LIST_SUCCESS, fetchListSuccess,
	fetchScheme, listSchemes,
};

export default colr;
