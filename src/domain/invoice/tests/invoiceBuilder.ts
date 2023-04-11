import { Address, Invoice, Product } from '..'

const _date = new Date('2023-04-23T22:00:00.000Z').toISOString()
const _dueDate = new Date('2023-06-15T22:00:00.000Z').toISOString()

export const invoiceBuilder = ({
  id = 'id',
  date = _date,
  dueDate = _dueDate,
  currency = 'USD',
  description = 'test description',
  status = 'pending',
  contact = 'testing contact',
  owner = 'testing owner',
  sender = addressBuilder().getProps(),
  buyer = {
    name: 'testing name',
    address: addressBuilder().getProps(),
  },
  products = [],
}: {
  id?: string
  date?: string
  dueDate?: string
  description?: string | null
  currency?: string
  status?: string
  contact?: string
  owner?: string
  sender?: Address['data']
  buyer?: {
    name: string
    address: Address['data']
  }
  products?: Product['data'][]
} = {}) => {
  const props = { id, date, dueDate, description, status, contact, owner, sender, buyer, products, currency }
  return {
    withId: (id: string) => invoiceBuilder({ ...props, id }),
    withDate: (date: string) => invoiceBuilder({ ...props, date }),
    withDueDate: (dueDate: string) => invoiceBuilder({ ...props, dueDate }),
    withDescription: (description: string) => invoiceBuilder({ ...props, description }),
    withCurrency: (currency: string) => invoiceBuilder({ ...props, currency }),
    withStatus: (status: string) => invoiceBuilder({ ...props, status }),
    withContact: (contact: string) => invoiceBuilder({ ...props, contact }),
    withOwner: (owner: string) => invoiceBuilder({ ...props, owner }),
    withSender: (sender: Address['data']) => invoiceBuilder({ ...props, sender }),
    withBuyer: (buyer: { name: string; address: Address['data'] }) => invoiceBuilder({ ...props, buyer }),
    withBuyerName: (name: string) => invoiceBuilder({ ...props, buyer: { ...props.buyer, name } }),
    withBuyerAddress: (address: Address['data']) => invoiceBuilder({ ...props, buyer: { ...props.buyer, address } }),
    withProducts: (products: Product['data'][]) => invoiceBuilder({ ...props, products }),
    getPropsWithoutCurrency: () => {
      const { currency, ...rest } = props
      return rest
    },
    getProps: () => props,
    build: () => Invoice.fromData(props),
  }
}

export const addressBuilder = ({
  street = 'street',
  city = 'city',
  zip = 'zip',
  country = 'country',
}: { street?: string; city?: string; zip?: string; country?: string } = {}) => {
  const props = { street, city, zip, country }
  return {
    withStreet: (street: string) => addressBuilder({ ...props, street }),
    withCity: (city: string) => addressBuilder({ ...props, city }),
    withZip: (zip: string) => addressBuilder({ ...props, zip }),
    withCountry: (country: string) => addressBuilder({ ...props, country }),
    getProps: () => props,
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
    getProps: () => props,
    build: () => Product.fromData(props),
  }
}
