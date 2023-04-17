import { Errors, Address } from '@invoice/shared'
import { addressBuilder } from '../invoiceBuilder'

const { EmptyError, TooLongError } = Errors

describe('Address', () => {
  describe('Rule: address street is required', () => {
    test('should throw if address street is empty', () => {
      const data = addressBuilder().withStreet(null).getProps()
      expect(() => Address.fromData(data)).toThrow(EmptyError)
    })
  })

  describe('Rule: address street length must be less or equal to 100 characters', () => {
    test('should throw if address street length is greater than 100 characters', () => {
      const data = addressBuilder().withStreet('a'.repeat(101)).getProps()
      expect(() => Address.fromData(data)).toThrow(TooLongError)
    })
    test('should not throw if address street length is equal to 100 characters', () => {
      const data = addressBuilder().withStreet('a'.repeat(100)).getProps()
      expect(Address.fromData(data).street).toBe('a'.repeat(100))
    })
  })

  describe('Rule: address city is required', () => {
    test('should throw if address city is empty', () => {
      const data = addressBuilder().withCity(null).getProps()
      expect(() => Address.fromData(data)).toThrow(EmptyError)
    })
  })

  describe('Rule: address city length must be less or equal to 50 characters', () => {
    test('should throw if address city length is greater than 50 characters', () => {
      const data = addressBuilder().withCity('a'.repeat(51)).getProps()
      expect(() => Address.fromData(data)).toThrow(TooLongError)
    })
    test('should not throw if address city length is equal to 50 characters', () => {
      const data = addressBuilder().withCity('a'.repeat(50)).getProps()
      expect(Address.fromData(data).city).toBe('a'.repeat(50))
    })
  })

  describe('Rule: address zip is required', () => {
    test('should throw if address zip is empty', () => {
      const data = addressBuilder().withZip(null).getProps()
      expect(() => Address.fromData(data)).toThrow(EmptyError)
    })
  })

  describe('Rule: address zip length must be less or equal to 50 characters', () => {
    test('should throw if address zip length is greater than 50 characters', () => {
      const data = addressBuilder().withZip('a'.repeat(51)).getProps()
      expect(() => Address.fromData(data)).toThrow(TooLongError)
    })
    test('should not throw if address zip length is equal to 50 characters', () => {
      const data = addressBuilder().withZip('a'.repeat(50)).getProps()
      expect(Address.fromData(data).zip).toBe('a'.repeat(50))
    })
  })

  describe('Rule: address country is required', () => {
    test('should throw if address country is empty', () => {
      const data = addressBuilder().withCountry(null).getProps()
      expect(() => Address.fromData(data)).toThrow(EmptyError)
    })
  })

  describe('Rule: address country length must be less or equal to 50 characters', () => {
    test('should throw if address country length is greater than 50 characters', () => {
      const data = addressBuilder().withCountry('a'.repeat(51)).getProps()
      expect(() => Address.fromData(data)).toThrow(TooLongError)
    })
    test('should not throw if address country length is equal to 50 characters', () => {
      const data = addressBuilder().withCountry('a'.repeat(50)).getProps()
      expect(Address.fromData(data).country).toBe('a'.repeat(50))
    })
  })
})
