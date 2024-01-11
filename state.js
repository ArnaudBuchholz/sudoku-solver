'use strict'

import { chunk, horizontal, vertical } from './axis'
import { all, unset, resolve, readDigits, isResolved } from './cell'

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
    const { changes, cells } = state

    const remove = (coord, digit) => {
      let cell = cells[coord]
      if (isResolved(cell)) {
        if (cell === digit) {
          throw new Error(`@{coord} is already resolved to ${digit}`)
        }
        return
      }
      cell = unset(cell, digit)
      cells[coord] = cell
      const [first, second] = readDigits(cell)
      if (second === undefined) {
        changes.push({ coord, digit: first })
      }
    }

    while (changes.length > 0) {
      const { coord, digit } = state.changes.shift()
      cells[coord] = resolve(cells[coord], digit)
      for (const x of horizontal(coord)) {
        if (x !== coord) {
          remove(x, digit)
        }
      }
      for (const y of vertical(coord)) {
        if (y !== coord) {
          remove(y, digit)
        }
      }
      for (const c of chunk(coord)) {
        if (c !== coord) {
          remove(c, digit)
        }
      }
    }
  }
}
