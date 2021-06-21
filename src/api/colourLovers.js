// because of CORS and my lack of experience there, for these api calls to work, a ColourLoversReceiver component
// needs to be in the document somewhere

const SCRIPT_ID = 'colour-lovers-api-script';
const INPUT_ID = 'cl-response-target';
const REQUEST_SCRIPT_ID = 'cl-request-script-';

const documentScript = `
const resolveCallbacks = new Map();

let clreqid  = 0;
const getColourLoversRequestIdC = () => {
	clreqid += 1;
	return clreqid;
}

function getColourLoversRequestId(resolve) {
	const id = getColourLoversRequestIdC();

	resolveCallbacks.set(id, resolve);

	console.log('id requested');
	console.log(resolveCallbacks);

	return id;
}

function getColourLoversCallback(requestId) {
	console.log('callback requested');
	return data => resolveRequest(requestId, data);
}

function resolveRequest(requestId, data) {
	console.log("resolving request");
	const resolve = resolveCallbacks.get(requestId);
	resolveCallbacks.delete(requestId);

	resolve(data);
}
`;

export const getRandomPalette = () => {
	return makeRequest('http://www.colourlovers.com/api/palettes/random')
		.then(response => response[0]);
}

export const getRandomPalettes = async (count) => {
	const palettes = [];

	for (let i = 0; i < count; i++) {
		const pal = await getRandomPalette();
		palettes.push(pal);
	}

	return palettes;
}

const makeRequest = url => {
	if (!verifyScript())
		throw new Error("the script is not there!");

	return new Promise((resolve, reject) => {
		const requestId = window.getColourLoversRequestId(resolve);
		const requestScript = document.createElement('script');
		requestScript.src = `${url}?format=json&jsonCallback=getColourLoversCallback(${requestId})`;
		requestScript.id = `${REQUEST_SCRIPT_ID}${requestId}`;

		document.body.appendChild(requestScript);
	})
}

const verifyScript = () => {
	if (Object.hasOwnProperty.call(window, 'getColourLoversRequestId'))
		return true;

	const script = document.createElement('script');
	script.text = documentScript;
	document.head.appendChild(script);

	return Object.hasOwnProperty.call(window, 'getColourLoversRequestId');
}

export const colorFetch = (color) => {

}
