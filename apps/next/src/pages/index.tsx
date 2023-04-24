import HeaderLayout from '@/Layout/HeaderLayout'
import FilterBar from '@/components/FilterBar'
import InvoiceLi from '@/components/InvoiceLi'
import data from '@/data/invoices.json'

export default function Home() {
  const invoices = data
  return (
    <HeaderLayout>
      <FilterBar
        invoiceLength={invoices.length}
        onNewInvoiceButtonClick={() => console.log('ok')}
      />
      <ul className='flex flex-col gap-4'>
        {invoices.map((invoice) => (
          <InvoiceLi key={invoice.id} invoice={invoice} />
        ))}
      </ul>
    </HeaderLayout>
  )
}
