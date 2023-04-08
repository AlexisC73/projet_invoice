import { Invoice } from '../../domain/invoice'

const buyer = {
  name: 'name',
  address: {
    street: 'street',
    city: 'city',
    zip: 'zip',
    country: 'country',
    state: 'state',
  },
}
const sender = {
  street: 'street',
  city: 'city',
  zip: 'zip',
  country: 'country',
  state: 'state',
}

export const fakeInvoice: Omit<Invoice['data'], 'id'> = {
  date: new Date(Date.now()).toISOString(),
  dueDate: new Date(Date.now()).toISOString(),
  description: 'Invoice description',
  currency: 'USD',
  status: 'pending',
  contact: 'contact',
  sender: sender,
  buyer: buyer,
  owner: '234JFIH3',
  items: [
    {
      id: 'id',
      name: 'name',
      quantity: 'quantity',
      unitPrice: 'unitPrice',
      description: 'description',
    },
  ],
}
