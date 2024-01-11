'use strict'

import { describe, it, expect } from 'vitest'
import { alloc, applyChanges } from './state'
import { all, unset, readDigits } from './cell'

describe('allocate a new state', () => {
  it('initializes members', () => {
    const state = alloc()
    expect(state.cells).toStrictEqual(new Array(81).fill(all))
    expect(state.remaining).toBe(81)
    expect(Array.isArray(state.changes)).toBe(true)
    expect(state.changes.length).toBe(0)
  })

  it('clones a state', () => {
    const state = alloc()
    state.cells[0] = unset(state.cells[0], 5)
    state.remaining = 123
    state.changes = [{ coord: 0, digit: 4 }]

    const clone = alloc(state)
    expect(clone).toStrictEqual(state)
  })
})

describe('changes', () => {
  it.only('apply changes and update the cells', () => {
    const state = alloc()
    state.changes.push({ coord: 0, digit: 5 })
    applyChanges(state)
    expect([...readDigits(state.cells[0])]).toStrictEqual([5])
    expect([...readDigits(state.cells[1])]).toStrictEqual([1, 2, 3, 4, 6, 7, 8, 9])
    expect([...readDigits(state.cells[2])]).toStrictEqual([1, 2, 3, 4, 6, 7, 8, 9])
    expect([...readDigits(state.cells[8])]).toStrictEqual([1, 2, 3, 4, 6, 7, 8, 9])
    expect([...readDigits(state.cells[9])]).toStrictEqual([1, 2, 3, 4, 6, 7, 8, 9])
    expect([...readDigits(state.cells[10])]).toStrictEqual([1, 2, 3, 4, 6, 7, 8, 9])
    expect([...readDigits(state.cells[11])]).toStrictEqual([1, 2, 3, 4, 6, 7, 8, 9])
    expect([...readDigits(state.cells[18])]).toStrictEqual([1, 2, 3, 4, 6, 7, 8, 9])
    expect([...readDigits(state.cells[19])]).toStrictEqual([1, 2, 3, 4, 6, 7, 8, 9])
    expect([...readDigits(state.cells[20])]).toStrictEqual([1, 2, 3, 4, 6, 7, 8, 9])
    expect([...readDigits(state.cells[27])]).toStrictEqual([1, 2, 3, 4, 6, 7, 8, 9])
    expect([...readDigits(state.cells[36])]).toStrictEqual([1, 2, 3, 4, 6, 7, 8, 9])
  })
})