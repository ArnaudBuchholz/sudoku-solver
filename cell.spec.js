'use strict'

import { describe, it, expect } from 'vitest'
import { all, has, set, unset } from './cell'

describe('has', () => {
  for (let digit = 1; digit < 10; ++digit) {
    it(`returns true for ${digit} in all`, () => expect(has(all, digit)).toBe(true))
    it(`returns true for ${digit} in ${digit}`, () => expect(has(digit, digit)).toBe(true))
    it(`returns false for ${digit} in 0`, () => expect(has(0, digit)).toBe(false))
  }
})

describe('set', () => {
  for (let digit = 1; digit < 10; ++digit) {
    const cell = set(all, digit)
    it(`sets ${digit} in all`, () => expect(has(cell, digit)).toBe(true))
    for (let other = 1; other < 10; ++other) {
      if (other !== digit) {
        it(`removes others digits (${other} !== ${digit})`, () => expect(has(cell, other)).toBe(false))
      }
    }
  }
})

describe('unset', () => {
  for (let digit = 1; digit < 10; ++digit) {
    const cell = unset(all, digit)
    it(`unsets ${digit} in all`, () => expect(has(cell, digit)).toBe(false))
    for (let other = 1; other < 10; ++other) {
      if (other !== digit) {
        it(`keeps others digits (${other} !== ${digit})`, () => expect(has(cell, other)).toBe(true))
      }
    }
  }
})
  