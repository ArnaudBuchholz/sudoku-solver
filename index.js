const solve = require('./sudoku-solver.js')
let [,, digits] = process.argv

let puzzles = [
  '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79', // initial challenge
  '7143.....8........2...8..61.21.5..43.3..9..7.57..1.92.34..7...9........8.....1237', // easy
  '...4..8....368.1.5.....1.4.43..5.7...9.....5...2.4..16.6.8.....7.8.136....4..7...', // medium
  '.2.4....714...6......5..341.58.....9....9....2.....86.573..8......7...239....4.5.', // tricky
]

if (digits === undefined) {
  digits = puzzles[3]
}

const input = []
for (let y = 0; y < 9; ++y) {
  input[y] = []
  for (let x = 0; x < 9; ++x) {
    input[y][x] = digits[9 * y + x]
  }
}

function render (board) {
  for (let y = 0; y < 9; ++y) {
    if (y === 3 || y === 6) {
      console.log('---+---+---')
    }
    console.log(board[y].slice(0, 3).join('') + '|' + board[y].slice(3, 6).join('') + '|' + board[y].slice(6, 9).join(''))
  }
}
console.log('Input :')
render(input)

console.log('Result :')
render(solve(input))
