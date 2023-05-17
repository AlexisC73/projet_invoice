import FormTitle from '@/components/Form/FormTitle'
import FullInvoiceForm from '@/components/Form/SideInvoiceForm/FullInvoiceForm'
import GoBackButton from '@/components/ui/GoBackButton'
import { Invoice } from '@invoice/domain'
import { usePostNewInvoiceMutation } from '../api/invoice.api'
import { FormEvent } from 'react'
import { createPostInvoiceCommand } from '@/utils'

export default function AddNewInvoiceForm({
  defaultInvoice,
  closeForm,
}: {
  defaultInvoice: Invoice['data']
  closeForm: () => void
}) {
  const [addInvoice] = usePostNewInvoiceMutation()

  const handleAddNewInvoice = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const invoiceCommand = createPostInvoiceCommand(formData)
    invoiceCommand.date = new Date().toString()
    invoiceCommand.dueDate = new Date().toString() //Todo ajouter la prise en charge des dates.

    await addInvoice(invoiceCommand)
    closeForm()
  }

  return (
    <div className='xl:fixed top-[4.5rem] sm:top-0 left-0 right-0 bg-white dark:bg-[#141625] w-full sm:w-4/5 sm:min-w-[40rem] xl:w-[45rem] xl:pt-[2.0625rem] xl:pl-[9.875rem] sm:pl-[1.875rem] sm:pt-[2.125rem] sm:pr-[1.125rem] sm:h-screen flex flex-col rounded-br-[1.25rem] rounded-tr-[1.25rem]'>
      <div className='sm:hidden pt-6 px-6'>
        <GoBackButton />
      </div>
      <div className='sm:pt-6 px-6 pt-0 xl:px-0'>
        <div className='mt-[1.25rem] dark:text-white sm:mt-[4.9375rem] sm:pl-[0.0625rem] xl:mt-0 xl:pl-0'>
          <FormTitle>New Invoice</FormTitle>
        </div>
      </div>
      <div className='flex-1 sm:overflow-y-scroll overflow-x-hidden sm:mt-[1.0625rem] xl:mt-[2.5rem]'>
        <FullInvoiceForm
          onCancel={closeForm}
          onSubmit={handleAddNewInvoice}
          invoice={defaultInvoice}
        />
      </div>
    </div>
  )
}
