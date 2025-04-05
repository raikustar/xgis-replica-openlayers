export function randomNumber(): number {
    const n = Math.random() * (254) + 1
    return Math.round(n)
  }