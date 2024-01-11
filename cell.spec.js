'use strict'

import { describe, it, expect } from 'vitest'
import { all, has, resolve, isResolved, unset, readDigits } from './cell'

describe('has', () => {
  for (let digit = 1; digit < 10; ++digit) {
    it(`returns true for ${digit} in all`, () => expect(has(all, digit)).toBe(true))
    it(`returns true for ${digit} in ${digit}`, () => expect(has(digit, digit)).toBe(true))
    it(`returns false for ${digit} in 0`, () => expect(has(0, digit)).toBe(false))
  }
})

describe('resolve', () => {
  for (let digit = 1; digit < 10; ++digit) {
    const cell = resolve(all, digit)
    it(`sets ${digit} in all`, () => expect(has(cell, digit)).toBe(true))
    for (let other = 1; other < 10; ++other) {
      if (other !== digit) {
        it(`removes others digits (${other} !== ${digit})`, () => expect(has(cell, other)).toBe(false))
      }
    }
  }
})

describe('isResolved', () => {
  it('indicates the cell was resolved (false)', () => {
    expect(isResolved(all)).toBe(false)
  })

  it('indicates the cell was resolved (false)', () => {
    expect(isResolved(resolve(all, 1))).toBe(true)
  })
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

describe('readDigits', () => {
  it('lists possible digits in a cell', () => {
    expect([...readDigits(all)]).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('gives a result on resolved cells', () => {
    expect([...readDigits(resolve(all, 1))]).toStrictEqual([1])
  })

  it('strips unset digits', () => {
    const cell = unset(all, 5)
    expect([...readDigits(cell)]).toStrictEqual([1, 2, 3, 4, 6, 7, 8, 9])
  })
})
