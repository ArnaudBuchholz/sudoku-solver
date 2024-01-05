'use strict'

/*
  Instead of using (x,y) coordinates,
  use a unique coordinate that translate as illustrated below

  00 01 02 | 03 04 05 | 06 07 08
  09 10 11 | 12 13 14 | 15 16 17
  18 19 20 | 21 22 23 | 24 25 26
  ---------+----------+---------
  27 28 29 | 30 31 32 | 33 34 35
  36 37 38 | 39 40 41 | 42 43 44
  45 46 47 | 48 49 50 | 51 52 53
  ---------+----------+---------
  54 55 56 | 57 58 59 | 60 61 62
  63 64 65 | 66 67 68 | 69 70 71
  72 73 74 | 75 76 77 | 78 79 80
*/

/** list vertical coordinates matching the given one */
export function * vertical (coord) {
  let current = coord % 9
  for (let y = 0; y < 9; ++y) {
    yield current
    current += 9
  }
}

/** list horizontal coordinates matching the given one */
export function * horizontal (coord) {
  const y = (coord - coord % 9) / 9
  for (let x = 0; x < 9; ++x) {
    yield y * 9 + x
  }
}

/** list chunk coordinates matching the given one */
export function * chunk (coord) {
  const x = 3 * Math.floor(coord % 9 / 3)
  const y = 3 * Math.floor((coord - x) / 27)
  for (let z = 0; z < 9; ++z) {
    yield 9 * (y + Math.floor(z / 3)) + x + z % 3
  }
}
