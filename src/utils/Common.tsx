/**
 * @param min - First input for minimum number. Default is 1.
 * @param max - Second input for maximum number. Default is 255.
 * @returns A random value between `min` and `max`.
 */
export function getRandomNumber(min:number = 1, max:number = 255): number {
  return Math.round((Math.random() * max) - min)
}




