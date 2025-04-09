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
