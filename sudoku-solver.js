'use strict'

module.exports = function (input) {
  const initialState = {
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

  const getChoices = (state, x, y) => {
    const cell = state.cells[y][x]
    if (Array.isArray(cell)) {
      return cell
    }
    return []
  }

  const clone = state => {
    const cells = new Array(9).fill(0).map((_, y) => {
      return new Array(9).fill(0).map((_, x) => {
        const cell = state.cells[y][x]
        if (Array.isArray(cell)) {
          return [...cell]
        }
        return cell
      })
    })
    return {
      cells,
      guesses: [],
      remaining: state.remaining
    }
  }

  // Set the puzzle input
  for (let y = 0; y < 9; ++y) {
    for (let x = 0; x < 9; ++x) {
      const digit = input[y][x]
      if (digit !== '.') {
        set(initialState, x, y, Number(digit))
      }
    }
  }

  const states = [
    clone(initialState)
  ]

  while (states.length) {
    const state = states.pop()

    while (state.guesses.length) {
      const { x, y, digit } = state.guesses.shift()
      set(state, x, y, digit)
    }

    if (state.remaining === 0) {
      return state.cells
    }

    const remainingChoices = []
    for (let y = 0; y < 9; ++y) {
      for (let x = 0; x < 9; ++x) {
        const choices = getChoices(state, x, y)
        if (choices.length > 0) {
          let score = 0
          const gxBase = Math.floor(x / 3) * 3
          const gyBase = Math.floor(y / 3) * 3
          for (let z = 0; z < 9; ++z) {
            score += getChoices(state, z, y).length + getChoices(state, x, z).length
            const gx = gxBase + z % 3
            const gy = gyBase + Math.floor(z / 3)
            score += getChoices(state, gx, gy).length
          }
          remainingChoices.push({ x, y, choices, score })
        }
      }
    }
    remainingChoices.sort((first, second) => {
      if (first.choices.length !== second.choices.length) {
        return first.choices.length - second.choices.length
      }
      return first.score - second.score
    })

    const { x, y, choices } = remainingChoices[0]
    choices.forEach(digit => {
      const clonedState = clone(state)
      clonedState.guesses.push({ x, y, digit })
      states.push(clonedState)
    })
  }
}
