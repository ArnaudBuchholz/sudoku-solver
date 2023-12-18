'use strict'

module.exports = function (input) {
  const cells = new Array(9).fill(0).map(_ => {
    return new Array(9).fill(0).map(_ => [1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
  const guesses = []
  let remaining = 81

  const remove = (x, y, digit) => {
    const cell = cells[y][x]
    if (Array.isArray(cell) && cell.includes(digit)) {
      const newCell = cell.filter(value => value !== digit)
      if (newCell.length === 1) {
        guesses.push({ x, y, digit: newCell[0] })
      }
      cells[y][x] = newCell
    }
  }

  const set = (x, y, digit) => {
    cells[y][x] = digit
    --remaining
    const gxBase = Math.floor(x / 3) * 3
    const gyBase = Math.floor(y / 3) * 3
    for (let z = 0; z < 9; ++z) {
      remove(z, y, digit)
      remove(x, z, digit)
      const gx = gxBase + z % 3
      const gy = gyBase + Math.floor(z / 3)
      remove(gx, gy, digit)
    }
  }

  for (let y = 0; y < 9; ++y) {
    for (let x = 0; x < 9; ++x) {
      const digit = input[y][x]
      if (digit !== '.') {
        set(x, y, Number(digit))
      }
    }
  }

  while (guesses.length) {
    const { x, y, digit } = guesses.shift()
    set(x, y, digit)
  }

  if (remaining !== 0) {
    console.log('Missing', remaining, 'cells')
    for (let y = 0; y < 9; ++y) {
      if (y === 3 || y === 6) {
        console.log('---+---+---')
      }
      const output = []
      for (let x = 0; x < 9; ++x) {
        if (x === 3 || x === 6) {
          output.push('|')
        }
        if (Array.isArray(cells[y][x])) {
          output.push(cells[y][x].length)
        } else {
          output.push(' ')
        }
      }
      console.log(output.join(''))
    }
  }

  return cells
}
