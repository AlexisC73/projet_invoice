type Invoice = {
  id: string
  date: string
  dueDate: string
  description: string
  currency: string
  status: string
  contact: string
  owner: string
  sender: Adress
  buyer: {
    name: string
    address: Adress
  }
  items: Product[]
}

type Adress = {
  street: string
  city: string
  zip: string
  country: string
}

type Product = {
  id: string
  name: string
  quantity: string
  unitPrice: string
  description: string
}
