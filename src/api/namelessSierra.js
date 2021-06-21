import axios from "axios";
import { formatHex } from "../models/Color";
import colorCache from "./ColorCache"

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const axiosWithAuth = () => {
	return axios.create({
		headers: {
			Authorization: ACCESS_TOKEN
		},
		baseURL: "https://nameless-sierra-35621.herokuapp.com/api"
	})
};

const colorUrl = (color) => {
	return `/color/${color}`;
}

export const fetchColor = (color) => {
	if (colorCache.hasColor(color))
		return Promise.resolve(colorCache.getColor(color));

	return fetchQueue.addRequest(color);
}

class FetchQueue {
	constructor() {
		this._queue = [];
		this._running = false;
	}

	addRequest(color) {
		return new Promise((resolve, reject) => {
			const task = { color, resolve, reject };
			this._queue.push(task);
			this.checkStart();
		});
	}

	checkStart() {
		if (!this._running && this._queue.length > 0)
			this.start();
	}

	async start() {
		this._running = true;
		while (this._queue.length > 0) {
			const { color, resolve, reject } = this._queue.shift();;
			console.log(`Fetching ${color} (${this._queue.length} in queue)`);

			try {
				const res = await axiosWithAuth().get(colorUrl(color));
				colorCache.addColor(color, res.data);
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		}

		this._running = false;
	}
}

const fetchQueue = new FetchQueue();
