import HeaderLayout from '@/Layout/HeaderLayout'
import SideInvoiceForm from '@/components/Form/SideInvoiceForm'
import data from '@/data/invoices.json'

export default function Home() {
  const invoices = data

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    console.log(data)
  }

  return (
    <HeaderLayout>
      <SideInvoiceForm onSubmit={handleSubmit} invoice={invoices[0]} />
    </HeaderLayout>
  )
}
