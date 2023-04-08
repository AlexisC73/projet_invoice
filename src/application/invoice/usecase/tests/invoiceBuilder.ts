import { Address, Invoice, Product } from '../../../../domain/invoice'

const _date = new Date('2023-04-23T22:00:00.000Z').toISOString()
const _dueDate = new Date('2023-06-15T22:00:00.000Z').toISOString()

export const invoiceBuilder = ({
  id = 'id',
  date = _date,
  dueDate = _dueDate,
  description = 'testing description',
  currency = 'USD',
  status = 'pending',
  contact = 'testing contact',
  owner = 'testing owner',
  sender = adressBuilder().build(),
  buyer = {
    name: 'testing name',
    address: adressBuilder().build(),
  },
  items = [],
}: {
  id?: string
  date?: string
  dueDate?: string
  description?: string
  currency?: string
  status?: string
  contact?: string
  owner?: string
  sender?: Address
  buyer?: {
    name: string
    address: Address
  }
  items?: Product[]
} = {}) => {
  const props = { id, date, dueDate, description, currency, status, contact, owner, sender, buyer, items }
  return {
    withId: (id: string) => invoiceBuilder({ ...props, id }),
    withDate: (date: string) => invoiceBuilder({ ...props, date }),
    withDueDate: (dueDate: string) => invoiceBuilder({ ...props, dueDate }),
    withDescription: (description: string) => invoiceBuilder({ ...props, description }),
    withCurrency: (currency: string) => invoiceBuilder({ ...props, currency }),
    withStatus: (status: string) => invoiceBuilder({ ...props, status }),
    withContact: (contact: string) => invoiceBuilder({ ...props, contact }),
    withOwner: (owner: string) => invoiceBuilder({ ...props, owner }),
    withSender: (sender: Address) => invoiceBuilder({ ...props, sender }),
    withBuyer: (buyer: { name: string; address: Address }) => invoiceBuilder({ ...props, buyer }),
    withItems: (items: Product[]) => invoiceBuilder({ ...props, items }),
    build: () => Invoice.fromData(props),
  }
}

export const adressBuilder = ({
  street = 'street',
  city = 'city',
  zip = 'zip',
  country = 'country',
}: { street?: string; city?: string; zip?: string; country?: string } = {}) => {
  const props = { street, city, zip, country }
  return {
    withStreet: (street: string) => adressBuilder({ ...props, street }),
    withCity: (city: string) => adressBuilder({ ...props, city }),
    withZip: (zip: string) => adressBuilder({ ...props, zip }),
    withCountry: (country: string) => adressBuilder({ ...props, country }),
    build: () => Address.fromData(props),
  }
}

export const productBuilder = ({
  id = 'id',
  name = 'name',
  quantity = 'quantity',
  unitPrice = 'unitPrice',
  description = 'description',
}: {
  id?: string
  name?: string
  quantity?: string
  unitPrice?: string
  description?: string
} = {}) => {
  const props = { id, name, quantity, unitPrice, description }
  return {
    withId: (id: string) => productBuilder({ ...props, id }),
    withName: (name: string) => productBuilder({ ...props, name }),
    withQuantity: (quantity: string) => productBuilder({ ...props, quantity }),
    withUnitPrice: (unitPrice: string) => productBuilder({ ...props, unitPrice }),
    withDescription: (description: string) => productBuilder({ ...props, description }),
    build: () => Product.fromData(props),
  }
}
