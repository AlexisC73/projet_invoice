import HeaderLayout from '@/Layout/HeaderLayout'
import FilterBar from '@/components/FilterBar'
import SideInvoiceForm from '@/components/Form/SideInvoiceForm'
import InvoiceLi from '@/components/InvoiceLi'
import data from '@/data/invoices.json'
import { useAppSelector } from '@/hooks/redux'
import { createPostInvoiceCommand } from '@/utils'
import { FormEvent, useState } from 'react'

export default function Home() {
  const invoices = useAppSelector((state) => state.invoices)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleSubmitAddInvoice = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const postInvoiceCommand = createPostInvoiceCommand(formData)
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
