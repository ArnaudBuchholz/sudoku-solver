'use strict'

import { chunk, horizontal, vertical } from './axis'
import { all, unset, resolve } from './cell'

module.exports = {
  alloc (clone = undefined) {
    if (clone) {
      return {
        ...clone,
        cells: [...clone.cells],
        changes: [...clone.changes]
      }
    }
    return {
      cells: new Array(81).fill(all),
      remaining: 81,
      changes: []
    }
  },

  applyChanges (state) {
    while (state.changes.length > 0) {
      const { coord, digit } = state.changes.shift()
      state.cells[coord] = resolve(state.cells[coord], digit)
      for (let x of horizontal(coord)) {
        if (x !== coord) {
          state.cells[x] = unset(state.cells[x], digit)
        }
      }
      for (let y of vertical(coord)) {
        if (y !== coord) {
          state.cells[y] = unset(state.cells[y], digit)
        }
      }
      for (let c of chunk(coord)) {
        if (c !== coord) {
          state.cells[c] = unset(state.cells[c], digit)
        }
      }
    }
  }
}
