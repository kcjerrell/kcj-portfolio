// API JSON Representation
// {
// 	"timestamp": 1111913466,
// 	"colors": [
// 			"debe8d",
// 			"e5bc85"
// 	],
// 	"id": "1902",
// 	"tags": [
// 			{
// 					"id": "5724",
// 					"name": "ripe"
// 			},
// 			{
// 					"id": "3359",
// 					"name": "wheat"
// 			}
// 	],
// }

import Color from "./Color";
import Tag from "./Tag";

// In WPF, the paradigm is MVVM: Model, View, ViewModel.
// I'm not sure how those concepts, or similarly named concepts like MVC or MVP, translate to React
// But the idea of using a 'model' to represent your data seems like it would be advantageous in this app,
// instead of just throwing JSON objects around as the API gives them
// And since I want to have access to different functionality with my "scheme", "color", and "tag" objects,
// using classes to represent these items instead of just the raw JSON is going to be a lot more useful,
// cleaner, and 'safer'

// so it seems that it's not uncommon at all for a scheme to be given with a bad color in it.
// like #a9. #a9 is not a color. although now that I think of it maybe I could interpret it as a shade of gray.
// ie: #a9a9a9. I'm gonna go with that. nvm. This little rant is on hold until it sends me a color with 5 digits.


export default class Scheme {
	constructor(jsonData) {
		// colr has a 'timestamp' prop, colourlovers does not
		const colr = jsonData.hasOwnProperty('timestamp');

		/** @type {number} identifies the scheme in the colr.org api */
		this.id = jsonData.id;

		/** @type {Color[]} a list of the scheme's colors */
		this.colors = jsonData.colors.map(color => new Color(color));

		if (colr) {
			/** @type {Tag[]} a list of tags describing the scheme*/
			this.tags = jsonData.tags.map(tag => new Tag(tag));

			/** @type {string} a 'name' for the scheme composed of it's tags */
			this.name = concatTagNames(this.tags);
		}

		else {
			this.tags = [];
			this.name = jsonData.title;
		}

		const lumaSort = this.colors.sort((a, b) => a.luma - b.luma);
		this.darkest = lumaSort[0];
		this.lightest = lumaSort[lumaSort.length - 1];
	}

}

function concatTagNames(tags) {
	return tags.map(t => t.name).join(' ');
}
