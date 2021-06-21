import axios from "axios"
import Scheme from "../models/Scheme";
import cache from './ColorCache';

const apiUrl = 'https://www.colr.org/json/';

const buildUrl = (...parts) => {
	const endPoint = parts.join('/');
	const url = `${apiUrl}${endPoint}`;

	// This is probably stupid
	Object.getPrototypeOf(url).query = params => addQuery(url, params);
	return url;
}

const addQuery = (url, params) => {
	const kvs = Object.keys(params).map(k => `${k}=${params[k]}`);
	const query = kvs.join('&');

	return [url, query].join('?');
}

// consider making this async. might be more readable.
export const getRandomSchemes = (count = 1, minSize = 4) => {
	const url = buildUrl('schemes', 'random', count).query({ scheme_size: `>${minSize}`, timestamp: Date.now() });

	return axios.get(url)
		.then(res => {
			return res.data.schemes
				.filter(scheme => scheme.colors.length >= minSize)
				.map(scheme => new Scheme(scheme));
		});
}

// consider rewriting this in a more reacty/reduxy way
// One where you somehow make the call THROUGH the cache provider instead of making the call on your own
// then offering it the data.
export const getColorInfo = (color) => {
	if (cache.hasColor(color))
		return Promise.resolve(cache.getColor(color));

	const url = buildUrl('color', color);
	return axios.get(url).then(res => {
		const colorInfo = res.data.colors[0];
		cache.addColor(color, colorInfo);

		return colorInfo;
	});
}
