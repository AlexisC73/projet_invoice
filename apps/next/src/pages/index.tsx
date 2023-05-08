import HeaderLayout from '@/Layout/HeaderLayout'
import FilterBar from '@/components/FilterBar'
import SideInvoiceForm from '@/components/Form/SideInvoiceForm'
import InvoiceLi from '@/components/InvoiceLi'
import {
  useGetAllOwnedInvoicesQuery,
  usePostNewInvoiceMutation,
} from '@/store/invoice.api'
import { createEmptyInvoice, createPostInvoiceCommand } from '@/utils'
import { FormEvent, useState } from 'react'

export default function Home() {
  const { data: invoices, isLoading } = useGetAllOwnedInvoicesQuery()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [postInvoice, { isLoading: postInvoiceLoading }] =
    usePostNewInvoiceMutation()

  const handleSubmitAddInvoice = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const postInvoiceCommand = createPostInvoiceCommand(formData)
    postInvoiceCommand.date = new Date().toISOString()
    postInvoiceCommand.dueDate = new Date().toISOString()
    postInvoice(postInvoiceCommand)
    setIsFormOpen(false)
  }

  if (isLoading) return <div>Loading...</div>

  if (!invoices) {
    return <div>Implement error with result</div>
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
          defaultInvoice={createEmptyInvoice()}
          onSubmit={handleSubmitAddInvoice}
        />
      )}
    </HeaderLayout>
  )
}
