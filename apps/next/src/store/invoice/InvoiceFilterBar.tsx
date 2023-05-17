import FilterBar from '@/components/FilterBar'
import {
  useGetAllOwnedInvoicesQuery,
  usePostNewInvoiceMutation,
} from '../api/invoice.api'
import AddNewInvoiceForm from './AddNewInvoiceForm'
import { createEmptyInvoiceData } from '@/utils'
import { Dispatch, SetStateAction, useState } from 'react'

export default function InvoiceFilterBar({
  filter,
  setFilter,
}: {
  filter: string[]
  setFilter: Dispatch<SetStateAction<string[]>>
}) {
  const { data: invoices, isLoading } = useGetAllOwnedInvoicesQuery()

  const filterInvoices = invoices?.filter((invoice) =>
    filter.length === 0 ? true : filter.includes(invoice.status)
  )

  const emptyInvoice = createEmptyInvoiceData()
  const [showAddNewInvoiceForm, setShowAddNewInvoiceForm] = useState(false)

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <FilterBar
        onNewInvoiceButtonClick={() => setShowAddNewInvoiceForm(true)}
        invoiceLength={filterInvoices?.length ?? 0}
        setFilter={setFilter}
        actualFilter={filter}
      />
      {showAddNewInvoiceForm && (
        <div className='z-10 absolute top-0 bottom-0 left-0 right-0'>
          <AddNewInvoiceForm
            closeForm={() => setShowAddNewInvoiceForm(false)}
            defaultInvoice={emptyInvoice}
          />
        </div>
      )}
    </>
  )
}
