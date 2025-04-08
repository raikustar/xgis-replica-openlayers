import { test, expect } from 'vitest'
import { getRandomNumber } from '../utils/Common'

test("Call randomizer function", () => {
    expect(getRandomNumber(3,1)).toBeGreaterThan(0)
})

