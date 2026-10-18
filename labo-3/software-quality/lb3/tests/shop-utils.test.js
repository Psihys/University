import { describe, expect, test } from 'vitest'

import {
  calculateDiscount,
  validateQuantity,
  getShippingCost,
} from '../src/shop-utils.js'

describe('calculateDiscount', () => {
  ;(test('returns the price after applying a 10% discount', () => {
    // Arrange
    const price = 100
    const percent = 10

    // Act
    const result = calculateDiscount(price, percent)

    // Assert
    expect(result).toBe(90)
  }),
    test('returns the original price when the discount is 0%', () => {
      const price = 100
      const percent = 0

      const result = calculateDiscount(price, percent)

      expect(result).toBe(100)
    }),
    test('returns 0 when the discount is 100%', () => {
      const price = 100
      const percent = 100

      const result = calculateDiscount(price, percent)

      expect(result).toBe(0)
    }),
    test('throws an error when the price is negative', () => {
      const price = -10
      const percent = 10

      expect(() => calculateDiscount(price, percent)).toThrow(
        'Price must be a non-negative number'
      )
    }))
})

describe('validateQuantity', () => {
  test.for([
    { quantity: 1, expected: true },
    { quantity: 2, expected: true },
    { quantity: 9, expected: true },
    { quantity: 10, expected: true },

    { quantity: 0, expected: false },
    { quantity: 11, expected: false },
    { quantity: 1.5, expected: false },
  ])(
    'validateQuantity($quantity) returns $expected',
    ({ quantity, expected }) => {
      expect(validateQuantity(quantity)).toBe(expected)
    }
  )
})

describe('getShippingCost', () => {
  test('throws an error when the price is negative', () => {
    const total = -1

    expect(() => getShippingCost(total)).toThrow(
      'Total must be a non-negative number'
    )
  })

  test('throws an error when the price is negative', () => {
    const total = 999

    const result = getShippingCost(total)

    expect(result).toBe(100)
  })

  test('throws an error when the price is negative', () => {
    const total = 1000

    const result = getShippingCost(total)

    expect(result).toBe(0)
  })
})
