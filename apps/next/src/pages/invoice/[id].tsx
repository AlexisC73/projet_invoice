import HeaderLayout from '@/Layout/HeaderLayout'
import { useRouter } from 'next/router'
import data from '@/data/invoices.json'
import InvoiceHeader from '@/components/InvoiceHeader'
import { Invoice } from '@invoice/domain'
import { useEffect, useState } from 'react'
import InvoiceDetails from '@/components/InvoiceDetails'
import GoBackButton from '@/components/ui/GoBackButton'

export default function InvoicePage() {
  const { id } = useRouter().query
  const [invoice, setInvoice] = useState<Invoice['data']>()
  const [isLoading, setIsLoading] = useState(true)

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
      <InvoiceHeader invoice={invoice} />
      <InvoiceDetails invoice={invoice} />
    </HeaderLayout>
  )
}
