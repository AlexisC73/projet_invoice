import {
  CurrencyError,
  EmptyError,
  InvalidDateError,
  StatusError,
  TooLongError,
} from '../../errors'
import { Invoice } from '../../invoice'
import {
  addressBuilder,
  invoiceBuilder,
  productBuilder,
} from './invoiceBuilder'

describe('Invoice', () => {
  test('should create an invoice', () => {
    const data = invoiceBuilder().getProps()
    expect(Invoice.fromData(data).data).toEqual(data)
  })

  describe("Rule: 'date' must be a valid date", () => {
    test('create invoice with valid date', () => {
      const data = invoiceBuilder()
        .withDate('2023-04-23T22:00:00.000Z')
        .getProps()
      expect(Invoice.fromData(data).data).toEqual(data)
    })

    test('create invoice with invalid date', () => {
      const data = invoiceBuilder().withDate('invalid date').getProps()
      expect(() => Invoice.fromData(data)).toThrow(InvalidDateError)
    })
  })

  describe("Rule: 'dueDate' must be a valid date", () => {
    test('create invoice with valid dueDate', () => {
      const data = invoiceBuilder()
        .withDueDate('2023-04-23T22:00:00.000Z')
        .getProps()
      expect(Invoice.fromData(data).data).toEqual(data)
    })

    test('create invoice with invalid date', () => {
      const data = invoiceBuilder().withDueDate('invalid date').getProps()
      expect(() => Invoice.fromData(data)).toThrow(InvalidDateError)
    })
  })

  describe('Rule: description can be null', () => {
    test('create invoice with empty description', () => {
      const data = invoiceBuilder()
        .withDescription(null as any)
        .getProps()
      expect(Invoice.fromData(data).data).toEqual(data)
    })

    test("create invoice with description if it's not null", () => {
      const data = invoiceBuilder().withDescription('description').getProps()
      expect(Invoice.fromData(data).data).toEqual(data)
    })
  })

  describe('Rule: description length must be less or equal to 255 characters', () => {
    test('create invoice with empty description', () => {
      const data = invoiceBuilder().withDescription('a'.repeat(256)).getProps()
      expect(() => Invoice.fromData(data)).toThrow(TooLongError)
      expect(() => Invoice.fromData(data)).toThrow(TooLongError)
    })

    test("create invoice with description if it's not null", () => {
      const data = invoiceBuilder().withDescription('a'.repeat(255)).getProps()
      expect(Invoice.fromData(data).description).toBe('a'.repeat(255))
    })
  })

  describe("Rule: 'currency' required and must ba accepted currency", () => {
    test('create invoice with valid currency', () => {
      const data = invoiceBuilder().withCurrency('USD').getProps()
      expect(Invoice.fromData(data).data).toEqual(data)
    })

    test('create invoice with only whitespaces for currency', () => {
      const data = invoiceBuilder().withCurrency('   ').getProps()
      expect(() => Invoice.fromData(data)).toThrow(CurrencyError)
    })

    test('create invoice with not available currency', () => {
      const data = invoiceBuilder().withCurrency('USDC').getProps()
      expect(() => Invoice.fromData(data)).toThrow(CurrencyError)
    })

    test('create invoice with null currency', () => {
      const data = invoiceBuilder()
        .withCurrency(null as any)
        .getProps()
      expect(() => Invoice.fromData(data)).toThrow(CurrencyError)
    })
  })

  describe("Rule: 'status' is required and must be a valid status", () => {
    test("should create invoice with 'pendind' status", () => {
      const data = invoiceBuilder().withStatus('pending').getProps()
      expect(Invoice.fromData(data).status).toEqual('pending')
    })

    test("should create invoice with 'pendind' status when status is uppercase", () => {
      const data = invoiceBuilder().withStatus('Pending').getProps()
      expect(Invoice.fromData(data).status).toEqual('pending')
    })

    test("should throw if 'status' is not accepted yet", () => {
      const data = invoiceBuilder().withStatus('currently').getProps()
      expect(() => Invoice.fromData(data)).toThrow(StatusError)
    })

    test("should throw if 'status' is empty", () => {
      const data = invoiceBuilder()
        .withStatus(null as any)
        .getProps()
      expect(() => Invoice.fromData(data)).toThrow(StatusError)
    })
  })

  describe('Rule: "contact" can not be null', () => {
    test('should throw if contact is empty', () => {
      const data = invoiceBuilder()
        .withContact(null as any)
        .getProps()
      expect(() => Invoice.fromData(data)).toThrow(EmptyError)
    })

    test("create invoice with contact name if it's not null", () => {
      const data = invoiceBuilder().withContact('jean').getProps()
      expect(Invoice.fromData(data).contact).toEqual('jean')
    })
  })

  describe('Rule: "contact" length must be less or equal to 50 characters', () => {
    test('should throw if contact is more than 50 characters', () => {
      const data = invoiceBuilder().withContact('a'.repeat(51)).getProps()
      expect(() => Invoice.fromData(data)).toThrow(TooLongError)
    })

    test('should not throw if contact is equal to 50 characters', () => {
      const data = invoiceBuilder().withContact('a'.repeat(50)).getProps()
      expect(Invoice.fromData(data).contact).toBe('a'.repeat(50))
    })
  })

  describe('Rule: buyer name can not be null', () => {
    test('should throw if buyer name is empty', () => {
      const data = invoiceBuilder()
        .withBuyerName(null as any)
        .getProps()
      expect(() => Invoice.fromData(data)).toThrow(EmptyError)
    })

    test("create invoice with buyer name if it's not null", () => {
      const data = invoiceBuilder().withBuyerName('jean').getProps()
      expect(Invoice.fromData(data).buyer.name).toEqual('jean')
    })
  })

  describe('Rule: buyer name must be less or equal to 50', () => {
    test('should throw if buyer name is more than 50 characters', () => {
      const data = invoiceBuilder().withBuyerName('a'.repeat(51)).getProps()
      expect(() => Invoice.fromData(data)).toThrow(TooLongError)
    })

    test('should not throw if buyer name is equal to 50 characters', () => {
      const data = invoiceBuilder().withBuyerName('a'.repeat(50)).getProps()
      expect(Invoice.fromData(data).buyer.name).toBe('a'.repeat(50))
    })
  })

  describe('Rule: sender must be valid and can not be null', () => {
    test('should throw if sender is null', () => {
      const data = invoiceBuilder()
        .withSender(null as any)
        .getProps()
      expect(() => Invoice.fromData(data)).toThrow(EmptyError)
    })

    test('should use sender info if not null', () => {
      const data = invoiceBuilder()
        .withSender(addressBuilder().getProps())
        .getProps()
      expect(Invoice.fromData(data).sender).toEqual(addressBuilder().getProps())
    })
  })

  describe('Rule: buyer adress must be valid and can not be null', () => {
    test('should throw if sender is null', () => {
      const data = invoiceBuilder()
        .withBuyerAddress(null as any)
        .getProps()
      expect(() => Invoice.fromData(data)).toThrow(EmptyError)
    })

    test('should use sender info if not null', () => {
      const data = invoiceBuilder()
        .withBuyerAddress(addressBuilder().getProps())
        .getProps()
      expect(Invoice.fromData(data).sender).toEqual(addressBuilder().getProps())
    })
  })

  describe("Rule: 'products' can be empty array", () => {
    test('should create invoice with empty products', () => {
      const data = invoiceBuilder().withProducts([]).getProps()
      expect(Invoice.fromData(data).products).toEqual([])
    })

    test('should create invoice with products', () => {
      const data = invoiceBuilder()
        .withProducts([productBuilder().getProps()])
        .getProps()
      expect(Invoice.fromData(data).products).toEqual([
        productBuilder().getProps(),
      ])
    })
  })
})
