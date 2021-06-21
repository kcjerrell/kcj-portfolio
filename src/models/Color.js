const SHADE_METHOD = 4;

// API JSON Repressentation
// {
// 	"timestamp": 1187573498,
// 	"hex": "444746",
// 	"id": 28804,
// 	"tags": [
// 			{
// 					"timestamp": 1108110866,
// 					"id": 3916,
// 					"name": "arabian"
// 			},
// 			{
// 					"timestamp": 1108110855,
// 					"id": 2934,
// 					"name": "night"
// 			}
// 	],
// 	"onColor": "#ffffff"
// }

// While this class has a (match word?) in the colr api, it is constructed from a color string, rather than
// the api's json object.

// (trying to decide if the data provided by the api for colors is even worth fetching)

const AUTO_FETCH = false;

import { darken, rgbToHsl, hslToHex, hexToRgb, rgbToHex } from 'colorsys';
import { fetchColor } from '../api/namelessSierra';

export default class Color {

  constructor(hex) {
    this.hex = formatHex(hex);

    const match = this.hex.match(/#(?<r>[0-9A-F]{2})(?<g>[0-9A-F]{2})(?<b>[0-9A-F]{2})/);

    if (!match || !match.groups)
      throw new Error("invalid hex");

    const { r, g, b } = match.groups;

    this.r = parseInt(r, 16);
    this.g = parseInt(g, 16);
    this.b = parseInt(b, 16);

    if (AUTO_FETCH)
      this.fetchApiData();
  }

  get luma() {
    if (!this._luma)
      this._luma = this.r * 0.2126 + this.g * 0.7152 + this.b * 0.0722;

    return this._luma;
  }

  get onColor() {
    if (!this._onColor)
      this._onColor = this.luma < 140 ? "#FFFFFF" : "#000000";

    return this._onColor;
  }

  get highShade() {
    if (!this._high)
      this.calcShades();

    return this._high;
  }

  get lowShade() {
    if (!this._low)
      this.calcShades();

    return this._low;
  }

  calcShades() {
    switch (SHADE_METHOD) {
      case 1: {
        const hsl = rgbToHsl(this.r, this.g, this.b);

        const lHigh = Math.max((hsl.l + 50) / 1, 100);
        this._high = hslToHex(hsl.h, hsl.s, lHigh);

        const lLow = (hsl.l + 0) / 2;
        this._low = hslToHex(hsl.h, hsl.s, lLow);
        break;
      }

      case 2: {
        this._high = darken(this.hex, .20);
        this._low = darken(this.hex, -.20);
        break;
      }

      case 3: {
        const hsl = rgbToHsl(this.r, this.g, this.b);
        const sat = hsl.s * 0.5;
        const lLow = (0 + hsl.l) / 2;
        const lHigh = (100 + hsl.l) / 2;
        this._high = hslToHex(hsl.h, sat, lHigh);
        this._low = hslToHex(hsl.h, sat, lLow);
        break;
      }

      case 4: {
        this._high = interpolateColors(this.hex, "#FFFFFF");
        this._low = interpolateColors(this.hex, "#000000");
        break;
      }

      default: {
        this._high = this.hex;
        this._low = this.hex;
        break;
      }
    }
  }

  async fetchApiData() {
    try {
      this._data = await fetchColor(formatHex(this.hex, false, false))
      this.name = this._data.title;
      return true;
    } catch (error) {
      console.log("Color could not fetch", error);
      return false;
    }
  }
}

export const interpolateColors = (hexA, hexB, r = .75) => {
  const interp = (a, b, r) => (a * r) + (b * (1 - r));

  const colA = hexToRgb(hexA);
  const colB = hexToRgb(hexB);

  const colC = {
    r: interp(colA.r, colB.r, r),
    g: interp(colA.g, colB.g, r),
    b: interp(colA.b, colB.b, r),
  }

  return rgbToHex(colC);
}

/**
 * Returns a color hex code in the format of #FFFFFF
 * # symbol, followed by 6 hexadecimcal digits
 * @param {string} hex - the original hex string representation of a color, with or without #, 3 or 6 digits
 * @param {boolean} alpha - not implemented
 * @returns {string} a formatted hex color string
 */
// eslint-disable-next-line no-unused-vars
export const formatHex = (hex, alpha = false, includeHash = true) => {
  //const col = color[0] === '#' ? color.slice(1) : color;

  // I'm not gonna stress getting the regex perfect right now.
  // I just need to cover these cases: (the api returns these sometimes)
  //
  // #123abc    - 24bit RGB  (2 hex digits per component) (normal)
  // #13f       - 12bit RGB  (1 hex digit per component)
  // #a9        -  8bit Mono (2 hex digits)
  // #0         -  4bit Mono (1 hex digit)

  // Not sure if I will encounter or handle RGBA colors...
  // #9a9a2280  - 32bit RGBA (2 hex digits per component, 2 for alpha/transparency)
  // #abba      - 16bit RGBA (1 hex digit per componenet, 1 for alpha/transparency)

  // BE ON THE LOOKOUT FOR THESE ABERRANT FORMS
  // #99FF9     - 20bit ?????
  // #7777777   - 28bit ???????

  // It happened. Just received '52080'. we're just gonna assume leading zeroes were trimmed

  const prefix = includeHash ? "#" : "";

  const digits = hex.match(/^#?([0-9a-fA-F]+)$/)?.[1];

  if (!digits) { throw new Error("Invalid color hex string!"); }

  switch (digits.length) {
    case 6:
      return `${prefix}${digits}`.toUpperCase();

    case 5:
      return [prefix, '0', digits].join('').toUpperCase();

    case 3: {
      const r = digits[0];
      const g = digits[1];
      const b = digits[2];
      return [prefix, r, r, g, g, b, b].join('').toUpperCase();
    }

    case 2:
      return [prefix, digits, digits, digits].join('').toUpperCase();

    case 1:
      return [prefix, digits, digits, digits, digits, digits, digits].join('').toUpperCase();

    default:
      throw new Error("Invalid color hex string!");
  }
}
