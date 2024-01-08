'use strict'

import { all } from './cell'

module.exports = {
  alloc (clone = undefined) {
    if (clone) {
      return {
        ...clone,
        cells: [...clone.cells]
      }
    }
    return {
      cells: new Array(81).fill(all),
      remaining: 81
    }
  }
}
