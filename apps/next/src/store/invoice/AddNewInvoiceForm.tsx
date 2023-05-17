import FormTitle from '@/components/Form/FormTitle'
import FullInvoiceForm from '@/components/Form/SideInvoiceForm/FullInvoiceForm'
import GoBackButton from '@/components/ui/GoBackButton'
import { Invoice } from '@invoice/domain'
import { usePostNewInvoiceMutation } from '../api/invoice.api'
import { FormEvent } from 'react'
import { createPostInvoiceCommand } from '@/utils'
import ActionButton from '@/components/ui/ActionButton'

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
      <div className='flex-1 flex sm:mt-[1.0625rem] xl:mt-[2.5rem] pb-2 overflow-hidden'>
        <form
          onSubmit={handleAddNewInvoice}
          className='flex-1 flex flex-col px-6 sm:px-6 xl:pl-0'
        >
          <FullInvoiceForm invoice={defaultInvoice} />
          <div className='flex justify-between pt-[1.3125rem] gap-[0.5rem] pb-[1.375rem] px-6 sm:pt-[2.375rem] sm:pr-[2.5rem]'>
            <ActionButton
              clickAction={closeForm}
              action='Cancel'
              style='white'
            />
            <div className='flex gap-[0.5rem]'>
              <ActionButton
                clickAction={() => {
                  console.log('save as draft à faire')
                }}
                action='Save as Draft'
                style='black'
              />
              <ActionButton
                action='Save & Send'
                style='primary'
                type='submit'
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
