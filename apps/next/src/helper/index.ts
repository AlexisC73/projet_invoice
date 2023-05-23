import { InvoiceLiData } from '@/components/InvoiceLi'
import { Invoice, Product } from '@invoice/domain'

const MONTH = new Map([
  [1, 'Jan'],
  [2, 'Feb'],
  [3, 'Mar'],
  [4, 'Apr'],
  [5, 'May'],
  [6, 'Jun'],
  [7, 'Jul'],
  [8, 'Aug'],
  [9, 'Sep'],
  [10, 'Oct'],
  [11, 'Nov'],
  [12, 'Dec'],
])

export const InvoiceToInvoiceLiData = (invoice: Invoice): InvoiceLiData => {
  const totalPrice = invoice.products.reduce(
    (acc: number, cur: Product['data']) => {
      return acc + Number(cur.unitPrice) * Number(cur.quantity)
    },
    0
  )

  return {
    id: invoice.id,
    shortId: shorterId(invoice.id, 4).toUpperCase(),
    buyerName: invoice.buyer.name,
    dueDate: formatDate(invoice.dueDate),
    status: invoice.status,
    totalPrice,
  }
}

export const formatDate = (date: string) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()

  return `${day} ${MONTH.get(month)} ${year}`
}

export const shorterId = (id: string, numberOfChar: number) => {
  return id.slice(id.length - numberOfChar, id.length)
}
