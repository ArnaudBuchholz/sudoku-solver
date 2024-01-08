'use strict'

const CHOICES_ONE = 16
const choicesBits = []
choicesBits[1] = CHOICES_ONE
for (let i = 2; i < 10; ++i) {
  choicesBits[i] = choicesBits[i - 1] * 2
}

export const all = choicesBits.reduce((total, bit) => total + bit)

export function has (cell, digit) {
  if (cell < CHOICES_ONE) {
    return cell === digit
  }
  const mask = choicesBits[digit]
  return (cell & mask) === mask
}

export function resolve (cell, digit) {
  return digit
}

export function unset (cell, digit) {
  if (cell < CHOICES_ONE) {
    if (cell === digit) {
      throw new Error('Cannot unset value that is set')
    }
    return cell // Nothing to be done
  }
  const mask = choicesBits[digit]
  return cell & ~mask
}

export function * readDigits (cell) {
  for (let digit = 1; digit < 10; ++digit) {
    if (has(cell, digit)) {
      yield digit
    }
  }
}
