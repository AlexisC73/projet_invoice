import InvoiceLi from '@/components/InvoiceLi'
import { useGetAllOwnedInvoicesQuery } from '../api/invoice.api'
import { InvoiceToInvoiceLiData } from '@/helper'

export default function InvoiceList() {
  const { data: invoices, isLoading, isError } = useGetAllOwnedInvoicesQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <ul className='flex flex-col gap-4'>
      {invoices?.map((invoice) => (
        <InvoiceLi
          invoiceLiData={InvoiceToInvoiceLiData(invoice)}
          key={invoice.id}
        />
      ))}
    </ul>
  )
}
