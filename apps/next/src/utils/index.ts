import { Invoice, PostInvoiceCommand, Product } from '@invoice/domain'
import { UpdateInvoiceCommand } from '@invoice/domain/dist/invoice/usecases/update-invoice.usecase'
import uniqid from 'uniqid'

export const formatDate = (date: string) => {
  const dateObj = new Date(date)
  const monght = dateObj.toLocaleDateString('en-US', {
    month: 'short',
  })
  return `${dateObj.getDate()} ${monght} ${dateObj.getFullYear()}`
}

export const generateNewEmptyProduct = (): Product['data'] => {
  return {
    id: uniqid(),
    description: '',
    name: '',
    unitPrice: '0',
    quantity: '0',
  }
}

export const createPostInvoiceCommand = (
  formData: FormData
): PostInvoiceCommand => {
  const data: { [k: string]: FormDataEntryValue } = Object.fromEntries(formData)
  return {
    date: Date.now().toString(),
    dueDate: Date.now().toString(),
    contact: data['buyer-email'].toString(),
    description: data['description'].toString(),
    sender: {
      city: data['sender-city'].toString(),
      country: data['sender-country'].toString(),
      zip: data['sender-zip'].toString(),
      street: data['sender-street'].toString(),
    },
    buyer: {
      name: data['buyer-name'].toString(),
      address: {
        city: data['buyer-city'].toString(),
        country: data['buyer-country'].toString(),
        zip: data['buyer-zip'].toString(),
        street: data['buyer-street'].toString(),
      },
    },
    products: getProducts(data),
  }
}

export const createUpdateInvoiceCommand =
  (id: string) =>
  (formData: FormData): UpdateInvoiceCommand['invoiceToUpdate'] => {
    const data: { [k: string]: FormDataEntryValue } =
      Object.fromEntries(formData)
    return {
      id,
      date: Date.now().toString(),
      dueDate: Date.now().toString(),
      contact: data['buyer-email'].toString(),
      description: data['description'].toString(),
      sender: {
        city: data['sender-city'].toString(),
        country: data['sender-country'].toString(),
        zip: data['sender-zip'].toString(),
        street: data['sender-street'].toString(),
      },
      buyer: {
        name: data['buyer-name'].toString(),
        address: {
          city: data['buyer-city'].toString(),
          country: data['buyer-country'].toString(),
          zip: data['buyer-zip'].toString(),
          street: data['buyer-street'].toString(),
        },
      },
      products: getProducts(data),
    }
  }

const getProducts = (data: { [k: string]: FormDataEntryValue }) => {
  const products: Product['data'][] = []
  const productsArr = Object.entries(data).filter(([key]) => {
    return key.includes('product')
  })
  const tempProducts: {
    [k: string]: { name: string; unitPrice: string; quantity: string }
  } = {}
  productsArr.map(([key, value]) => {
    const [_, field, id] = key.split('-')
    products.filter((product) => product.id === id)
    tempProducts[id] = { ...tempProducts[id], [field]: value }
  })
  Object.keys(tempProducts).map((key) => {
    const { name, unitPrice, quantity } = tempProducts[key]
    products.push({
      id: key,
      name: name.toString(),
      unitPrice: unitPrice.toString(),
      quantity: quantity.toString(),
      description: null,
    })
  })
  return products
}

export const createEmptyInvoice = (): Invoice['data'] => {
  return {
    id: '',
    date: '',
    dueDate: '',
    contact: '',
    currency: '',
    owner: '',
    status: '',
    description: '',
    sender: {
      city: '',
      country: '',
      zip: '',
      street: '',
    },
    buyer: {
      name: '',
      address: {
        city: '',
        country: '',
        zip: '',
        street: '',
      },
    },
    products: [],
  }
}
