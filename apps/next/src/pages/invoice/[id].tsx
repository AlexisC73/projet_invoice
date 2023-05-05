import HeaderLayout from '@/Layout/HeaderLayout'
import { useRouter } from 'next/router'
import InvoiceHeader from '@/components/InvoiceHeader'
import { useCallback, useState } from 'react'
import InvoiceDetails from '@/components/InvoiceDetails'
import GoBackButton from '@/components/ui/GoBackButton'
import SideInvoiceForm from '@/components/Form/SideInvoiceForm'
import { createUpdateInvoiceCommand } from '@/utils'
import { useAppSelector } from '@/hooks/redux'

export default function InvoicePage() {
  const { id } = useRouter().query
  const invoice = useAppSelector((state) =>
    state.invoices.find((i) => i.id === id)
  )
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (!id) return
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const updateInvoiceCommand = createUpdateInvoiceCommand(id as string)(
        formData
      )
      setIsEditing(false)
    },
    [id]
  )

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
