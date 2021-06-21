const STORAGE_KEY = 'colorCache';
const STORAGE_TYPE = 'session';

// I'm not sure the colr.org api actually has any useful color information worth caching, or even fetching
// at all. Also, it doesn't have a rate limit (that I'm aware of) so there's not much of an advantage to
// caching api requests here anyway. YOU DON'T HAVE TO BE POLITE TO APIs.
class ColorCache {
	_storage;
	_cache = {};

	constructor() {
		if (STORAGE_TYPE === 'session')
			this._storage = window.sessionStorage;
		else
			this._storage = window.localStorage;

		const stored = this._storage.getItem(STORAGE_KEY);

		if (stored)
			this._cache = JSON.parse(stored);

		else
			this._storage.setItem(STORAGE_KEY, JSON.stringify({}));
	}

	hasColor(color) {
		return this._cache.hasOwnProperty(color);
	}

	getColor(color) {
		return this._cache[color];
	}

	addColor(color, data) {
		this._cache[color] = data;

		this._storage.setItem(STORAGE_KEY, JSON.stringify(this._cache));
	}
}

const cache = new ColorCache();

export default cache;
