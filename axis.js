'use strict'

export function * vertical (coord) {
  let current = coord % 9
  for (let y = 0; y < 9; ++y) {
    yield current
    current += 9
  }
}

export function * horizontal (coord) {
  let y = (coord - coord % 9) / 9
  for (let x = 0; x < 9; ++x) {
    yield y * 9 + x
  }
}

export function group (coord) {
  
}
