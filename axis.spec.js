'use strict'

import { describe, it, expect } from 'vitest'
import { vertical, horizontal, group } from './axis'

describe('axis', () => {
  describe('vertical', () => {
    const expectations = [
      [0, 9, 18, 27, 36, 45, 54, 63, 72],
      [1, 10, 19, 28, 37, 46, 55, 64, 73],
      [2, 11, 20, 29, 38, 47, 56, 65, 74],
      [3, 12, 21, 30, 39, 48, 57, 66, 75],
      [4, 13, 22, 31, 40, 49, 58, 67, 76],
      [5, 14, 23, 32, 41, 50, 59, 68, 77],
      [6, 15, 24, 33, 42, 51, 60, 69, 78],
      [7, 16, 25, 34, 43, 52, 61, 70, 79],
      [8, 17, 26, 35, 44, 53, 62, 71, 80],
    ]
    expectations[28] = expectations[1]
    expectations[61] = expectations[7]
    expectations[76] = expectations[4]

    expectations.forEach((expected, coord) => {
      it(`${coord} => [${expected.join(', ')}]`, () => {
        expect([...vertical(coord)]).toStrictEqual(expected)
      })
    })
  })

  describe('horizontal', () => {
    const expectations = []
    expectations[0] = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    expectations[9] = [9, 10, 11, 12, 13, 14, 15, 16, 17]
    expectations[18] = [18, 19, 20, 21, 22, 23, 24, 25, 26]
    expectations[27] = [27, 28, 29, 30, 31, 32, 33, 34, 35]
    expectations[36] = [36, 37, 38, 39, 40, 41, 42, 43, 44]
    expectations[45] = [45, 46, 47, 48, 49, 50, 51, 52, 53]
    expectations[54] = [54, 55, 56, 57, 58, 59, 60, 61, 62]
    expectations[63] = [63, 64, 65, 66, 67, 68, 69, 70, 71]
    expectations[72] = [72, 73, 74, 75, 76, 77, 78, 79, 80]
    expectations[28] = expectations[27]
    expectations[61] = expectations[54]
    expectations[76] = expectations[72]
  
    expectations.forEach((expected, coord) => {
      it(`${coord} => [${expected.join(', ')}]`, () => {
        expect([...horizontal(coord)]).toStrictEqual(expected)
      })
    })
  })
})
