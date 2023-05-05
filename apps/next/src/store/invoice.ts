import { Invoice } from '@invoice/domain/dist'
import { createSlice } from '@reduxjs/toolkit'
import data from '@/data/invoices.json'

export interface InvoiceState {
  invoices: Invoice['data'][]
}

const initialState = data as Invoice['data'][]

export const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
})

export const {} = invoiceSlice.actions

export default invoiceSlice.reducer
