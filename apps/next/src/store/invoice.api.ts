import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Invoice, PostInvoiceCommand } from '@invoice/domain'
import { UpdateInvoiceCommand } from '@invoice/domain/dist/invoice/usecases/update-invoice.usecase'

export const invoiceApi = createApi({
  reducerPath: 'invoiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5500',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getAllOwnedInvoices: builder.query<Invoice[], void>({
      query: () => `/invoice/owned`,
    }),
    postNewInvoice: builder.mutation<void, PostInvoiceCommand>({
      query: (body) => ({
        url: `/invoice`,
        method: 'POST',
        body: { invoice: body },
      }),
    }),
    editInvoice: builder.mutation<
      void,
      { body: UpdateInvoiceCommand['invoiceToUpdate']; id: string }
    >({
      query: ({ body, id }) => ({
        url: `/invoice/${id}`,
        method: 'PUT',
        body: { invoice: body },
      }),
    }),
    getSelectedInvoices: builder.query<Invoice, string>({
      query: (id) => `/invoice/${id}`,
    }),
  }),
})

export const {
  useGetAllOwnedInvoicesQuery,
  usePostNewInvoiceMutation,
  useGetSelectedInvoicesQuery,
  useEditInvoiceMutation,
} = invoiceApi
