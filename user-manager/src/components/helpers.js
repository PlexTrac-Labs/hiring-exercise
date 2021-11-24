const uuidv4 = require("uuid/v4");
import { CONTEXTS, DATA_MODELS } from "./constants.js";
// Parses HEXA string into R, G, B, A values
export function parseRGBA(hexColor) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hexColor
  );
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: parseInt(result[4], 16)
    }
    : null;
}

// Generates an accent color for text/icons to ensure there is good contrast between primary/accent
export function getAccentColor(primary) {
  const light = "white";
  const dark = "#424242";

  const rgba = parseRGBA(primary);
  if (!rgba || rgba.a < 170) return dark;

  const brightness = (rgba.r * 299 + rgba.g * 587 + rgba.b * 114) / 255000;

  return brightness >= 0.5 ? dark : light;
}

// Generates a list of 100 years
export function generateYears() {
  const max = new Date().getFullYear();
  const min = max - 100;
  const years = [];

  for (let i = max; i >= min; i--) {
    years.push(i.toString());
  }
  return years;
}

// Leveraging unique keys to ensure each dialog re-renders before opening
export function getUniqueKey() {
  return uuidv4();
}

// Removes any unnecessary keys from object before making a request
export function cleanObj(obj, context) {
  let cleaned = {};

  if (context === CONTEXTS.CREATE) {
    DATA_MODELS.CREATE_USER.forEach(item => {
      cleaned[item] = obj[item];
    });
    return cleaned;
  }

  if (context === CONTEXTS.UPDATE) {
    DATA_MODELS.UPDATE_USER.forEach(item => {
      cleaned[item] = obj[item];
    });
    return cleaned;
  }
}
