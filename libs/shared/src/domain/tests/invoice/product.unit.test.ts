import { EmptyError, TooLongError } from '../../errors'
import { Product } from '../../invoice'
import { productBuilder } from './invoiceBuilder'

describe('product', () => {
  describe("Rule: 'name' can not be null", () => {
    test('should throw if name is empty', () => {
      const data = productBuilder().withName(null).getProps()
      expect(() => Product.fromData(data)).toThrow(EmptyError)
    })
  })

  describe("Rule: 'name' length must be less or equal to 100 characters", () => {
    test('should throw if name is 101 characters long', () => {
      const data = productBuilder().withName('a'.repeat(101)).getProps()
      expect(() => Product.fromData(data)).toThrow(TooLongError)
    })

    test('should not throw if name length is 100 character', () => {
      const data = productBuilder().withName('a'.repeat(100)).getProps()
      expect(Product.fromData(data).name).toBe('a'.repeat(100))
    })
  })

  describe("Rule: 'desscription' can be null", () => {
    test('should not throw if description is null', () => {
      const data = productBuilder().withDescription(null).getProps()
      expect(Product.fromData(data).description).toBe(null)
    })
  })

  describe("Rule: 'description' length must be less or equal to 100 characters", () => {
    test('should throw description lentgh is more than 100 characters', () => {
      const data = productBuilder().withName('a'.repeat(101)).getProps()
      expect(() => Product.fromData(data)).toThrow(TooLongError)
    })

    test('should not throw if description length is 100', () => {
      const data = productBuilder().withName('a'.repeat(100)).getProps()
      expect(Product.fromData(data).name).toBe('a'.repeat(100))
    })
  })
})
