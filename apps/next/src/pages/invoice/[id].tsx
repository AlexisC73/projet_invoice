import HeaderLayout from '@/Layout/HeaderLayout'
import { useRouter } from 'next/router'
import InvoiceHeader from '@/components/InvoiceHeader'
import { useCallback, useMemo, useState } from 'react'
import InvoiceDetails from '@/components/InvoiceDetails'
import GoBackButton from '@/components/ui/GoBackButton'
import SideInvoiceForm from '@/components/Form/SideInvoiceForm'
import { createUpdateInvoiceCommand } from '@/utils'
import {
  useEditInvoiceMutation,
  useGetSelectedInvoicesQuery,
} from '@/store/invoice.api'

export default function InvoicePage() {
  const id: string = useRouter().query.id as string
  const { data: invoice, isLoading } = useGetSelectedInvoicesQuery(id as string)
  const [isEditing, setIsEditing] = useState(false)
  const [updateInvoice] = useEditInvoiceMutation()

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (!id) return
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const updateInvoiceCommand = createUpdateInvoiceCommand(id as string)(
        formData
      )
      const date = new Date().toString()
      updateInvoice({
        body: {
          ...updateInvoiceCommand,
          date,
          dueDate: date,
        },
        id: id,
      }).then(() => setIsEditing(false))
    },
    [id]
  )

  if (isLoading) return <div>Loading...</div>

  if (!invoice) {
    return <div>Implement not found invoice</div>
  }

  return (
    <HeaderLayout>
      <GoBackButton />
      <InvoiceHeader
        invoice={invoice}
        onEditAction={() => setIsEditing(true)}
        onDeleteAction={() => console.log('Not implements')}
        onMarkAsPaidAction={() => console.log('Not implements')}
      />
      <InvoiceDetails invoice={invoice} />
      {isEditing && (
        <SideInvoiceForm
          onCancel={() => setIsEditing(false)}
          onSubmit={handleSubmit}
          defaultInvoice={invoice}
        />
      )}
    </HeaderLayout>
  )
}
