'use strict'

import { describe, it, expect } from 'vitest'
import { alloc } from './state'
import { all, unset } from './cell'

describe('allocate a new state', () => {
  it('initializes members', () => {
    const state = alloc()
    expect(state.cells).toStrictEqual(new Array(81).fill(all))
    expect(state.remaining).toBe(81)
  })

  it('clones a state', () => {
    const state = alloc()
    state.cells[0] = unset(state.cells[0], 5)
    state.remaining = 123

    const clone = alloc(state)
    expect(clone).toStrictEqual(state)
  })
})
