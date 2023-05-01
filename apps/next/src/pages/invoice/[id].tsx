import HeaderLayout from '@/Layout/HeaderLayout'
import { useRouter } from 'next/router'
import data from '@/data/invoices.json'
import InvoiceHeader from '@/components/InvoiceHeader'
import { Invoice } from '@invoice/domain'
import { useEffect, useState } from 'react'
import InvoiceDetails from '@/components/InvoiceDetails'
import GoBackButton from '@/components/ui/GoBackButton'
import SideInvoiceForm from '@/components/Form/SideInvoiceForm'

export default function InvoicePage() {
  const { id } = useRouter().query
  const [invoice, setInvoice] = useState<Invoice['data']>()
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!id) {
      return
    }
    const invoices: Invoice['data'][] = data
    const invoiceInfo = invoices.filter((invoice) => invoice.id === id)[0]
    setInvoice(invoiceInfo)
    setIsLoading(false)
  }, [id])

  if (isLoading) {
    return <div>Implement a loading</div>
  }

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
          onSubmit={() => setIsEditing(false)}
          defaultInvoice={invoice}
        />
      )}
    </HeaderLayout>
  )
}
