import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Invoice, PostInvoiceCommand } from '@invoice/domain'
import { UpdateInvoiceCommand } from '@invoice/domain/dist/invoice/usecases/update-invoice.usecase'

export const invoiceApi = createApi({
  reducerPath: 'invoiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5500',
    credentials: 'include',
  }),
  tagTypes: ['Invoice'],
  endpoints: (builder) => ({
    getAllOwnedInvoices: builder.query<Invoice[], void>({
      query: () => `/invoice/owned`,
      providesTags: ['Invoice'],
    }),
    postNewInvoice: builder.mutation<void, PostInvoiceCommand>({
      query: (body) => ({
        url: `/invoice`,
        method: 'POST',
        body: { invoice: body },
      }),
      invalidatesTags: ['Invoice'],
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
      invalidatesTags: ['Invoice'],
    }),
    getSelectedInvoices: builder.query<Invoice, string>({
      query: (id) => `/invoice/${id}`,
      providesTags: ['Invoice'],
    }),
  }),
})

export const {
  useGetAllOwnedInvoicesQuery,
  usePostNewInvoiceMutation,
  useGetSelectedInvoicesQuery,
  useEditInvoiceMutation,
} = invoiceApi
