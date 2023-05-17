import InvoiceLi from '@/components/InvoiceLi'
import { useGetAllOwnedInvoicesQuery } from '../api/invoice.api'
import { InvoiceToInvoiceLiData } from '@/helper'

export default function InvoiceList({ filter }: { filter: string[] }) {
  const { data: invoices, isLoading, isError } = useGetAllOwnedInvoicesQuery()
  const filterInvoices = invoices?.filter((invoice) =>
    filter.length === 0 ? true : filter.includes(invoice.status)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <ul className='flex flex-col gap-4'>
      {filterInvoices?.map((invoice) => (
        <InvoiceLi
          invoiceLiData={InvoiceToInvoiceLiData(invoice)}
          key={invoice.id}
        />
      ))}
    </ul>
  )
}
