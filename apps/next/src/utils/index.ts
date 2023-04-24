import { Product } from '@invoice/domain'
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
