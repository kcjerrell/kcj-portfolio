import colr from './colrReducer';
import { reducer as stuff } from "./stuff";
import { combineReducers } from 'redux';

// So I need to be specific about what this project is going to do so I can design the state
// And what it is going to do is
// ... let you create/edit/customize color schemes
// and browse top/random schemes from colour lovers
// using color names and info from colour lovers api

// and as a stretch goal (or maybe this should just be my primary goal?):
// create icon sets sourced from the noun project

// I dunno, but I'm into colors lately, so that's what I'm gonna start with

// since combining multiple reducers makes a compound state object, I'm going to lead with
// that shape in mind, so I can add new things as I progress

// perhaps scheme and theme should be distinct.....
// scheme is just a set of colors
// theme probably includes that (based on material design) would include
// primaryColor + shades + onPrimary
// secondaryColor + shades + onSecondary
// backround + onBackground
// surface + onSurface
// error + onError

// getting too complicated. perhaps I'll start by just making a component that loads a random
// scheme from colour lovers

// Not to be used for initialState, just an example of the expected app state shape
/*
const dummyState = {
	// state consumed by the "theme designer" aspect
	designer: {
		colors: ['#000000', '#FFFFFF'],									// A list of colors that comprise the theme
		name: "Black and White",												// the user provided name for the theme
		description: "2 shades of definitely not gray"	// the user provided description of the theme
	},
	// state consumed by the "colour lovers api explorer" aspect
	clExplorer: {
		selectedItem: { }, 						// a color or color scheme object provided by the api perhaps
																	// only having an 'id' property initially, the rest to be loaded upon selection
		itemList: [ ], 								// a list of items (possibly only referenced by an ID) that can be selected
	},
};
*/

const reducers = {
	colr, stuff
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
