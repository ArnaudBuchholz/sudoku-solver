'use strict'

module.exports = function (input) {
  const state = {
    cells: new Array(9).fill(0).map(_ => {
      return new Array(9).fill(0).map(_ => [1, 2, 3, 4, 5, 6, 7, 8, 9])
    }),
    guesses: [],
    remaining: 81
  }

  const remove = (state, x, y, digit) => {
    const cell = state.cells[y][x]
    if (Array.isArray(cell) && cell.includes(digit)) {
      const newCell = cell.filter(value => value !== digit)
      if (newCell.length === 1) {
        state.guesses.push({ x, y, digit: newCell[0] })
      }
      state.cells[y][x] = newCell
    }
  }

  const set = (state, x, y, digit) => {
    state.cells[y][x] = digit
    --state.remaining
    const gxBase = Math.floor(x / 3) * 3
    const gyBase = Math.floor(y / 3) * 3
    for (let z = 0; z < 9; ++z) {
      remove(state, z, y, digit)
      remove(state, x, z, digit)
      const gx = gxBase + z % 3
      const gy = gyBase + Math.floor(z / 3)
      remove(state, gx, gy, digit)
    }
  }

  for (let y = 0; y < 9; ++y) {
    for (let x = 0; x < 9; ++x) {
      const digit = input[y][x]
      if (digit !== '.') {
        set(state, x, y, Number(digit))
      }
    }
  }

  while (state.guesses.length) {
    const { x, y, digit } = state.guesses.shift()
    set(state, x, y, digit)
  }

  if (state.remaining !== 0) {
    console.log('Missing', state.remaining, 'cells')
    for (let y = 0; y < 9; ++y) {
      if (y === 3 || y === 6) {
        console.log('---+---+---')
      }
      const output = []
      for (let x = 0; x < 9; ++x) {
        if (x === 3 || x === 6) {
          output.push('|')
        }
        if (Array.isArray(state.cells[y][x])) {
          output.push(state.cells[y][x].length)
        } else {
          output.push(' ')
        }
      }
      console.log(output.join(''))
    }
  }

  return state.cells
}
