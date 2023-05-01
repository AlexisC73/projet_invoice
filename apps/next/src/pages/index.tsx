import HeaderLayout from '@/Layout/HeaderLayout'
import FilterBar from '@/components/FilterBar'
import SideInvoiceForm from '@/components/Form/SideInvoiceForm'
import InvoiceLi from '@/components/InvoiceLi'
import data from '@/data/invoices.json'
import { FormEvent, useState } from 'react'

export default function Home() {
  const invoices = data
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleSubmitAddInvoice = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFormOpen(false)
  }

  return (
    <HeaderLayout>
      <FilterBar
        invoiceLength={invoices.length}
        onNewInvoiceButtonClick={() => setIsFormOpen(true)}
      />

      <ul className='mt-10 flex flex-col gap-[15px]'>
        {invoices.map((invoice) => (
          <InvoiceLi key={invoice.id} invoice={invoice} />
        ))}
      </ul>

      {isFormOpen && (
        <SideInvoiceForm
          onCancel={() => setIsFormOpen(false)}
          defaultInvoice={invoices[0]}
          onSubmit={handleSubmitAddInvoice}
        />
      )}
    </HeaderLayout>
  )
}
