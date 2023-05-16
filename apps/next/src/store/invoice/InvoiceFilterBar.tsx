import FilterBar from '@/components/FilterBar'
import { useGetAllOwnedInvoicesQuery } from '../api/invoice.api'

export default function InvoiceFilterBar() {
  const { data: invoices } = useGetAllOwnedInvoicesQuery()
  return (
    <>
      <FilterBar
        onNewInvoiceButtonClick={() =>
          console.log('implement the add new invoice form')
        }
        invoiceLength={invoices?.length ?? 0}
      />
    </>
  )
}
