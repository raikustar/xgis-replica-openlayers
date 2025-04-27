/**
 * @param max - First input for maximum number. Default is 255.
 * @param min - Second input for minimum number. Default is 1.
 * @returns A random value between `min` and `max`.
 */
export function getRandomNumber(max:number = 255, min:number = 1): number {
  if (min <= 0 || max <= 0) {
    throw new Error("Error: Input numbers are 0 or less.")
  }
  return Math.round((Math.random() * max) + min)
}

/**
 * Uses `getRandomNumber()` to create the RGB values. 
 * @returns A randomized "rgb(x,y,z,0.3)" string.
 */
export function getRandomColour(): string {
  const r = getRandomNumber()
  const g = getRandomNumber()
  const b = getRandomNumber()
  return `rgb(${r},${g},${b},0.3)`
}

/**
 * Takes hex colour and converts to a rgb colour.
 * 
 * @param colors - Array of hex colour strings.
 * @param index - Index to be used to retreive a string from the colors array.
 * 
 * @returns A string. Format of "rgb(r,g,b)".
 */
export function filterHexToRgb(colors:string[], index: number = 0): string {
  if (colors.length >= 1) {
    const hexColour = colors[index]
    const bigint = parseInt(hexColour.slice(1), 16)

    // arithmetic right shift bits by 16. 
    // Least significant bit is then masked with bitwise AND 255
    const r = (bigint >> 16) & 255
    // arithmetic right shift bits by 8. 
    // Least significant bit is then masked with bitwise AND 255
    const g = (bigint >> 8) & 255
    // Least significant bit is masked with bitwise AND 255
    const b = bigint & 255
    return `rgb(${r}, ${g}, ${b})`
  } 
  return "rgb(0,0,0,0)"
}


