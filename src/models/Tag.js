// API JSON Representation
// {
// 	"id": "5223",
// 	"name": "cub"
// }

export default class Tag {
	constructor(jsonData) {
		this.id = jsonData.id;
		this.name = jsonData.name;
	}
}