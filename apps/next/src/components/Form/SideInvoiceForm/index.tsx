import FullInvoiceForm from '@/components/Form/SideInvoiceForm/FullInvoiceForm'
import GoBackButton from '@/components/ui/GoBackButton'
import FormTitle from '../FormTitle'
import { Invoice } from '@invoice/domain'

export default function SideInvoiceForm({
  invoice,
  onSubmit,
}: {
  invoice: Invoice['data']
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <div className='absolute xl:fixed top-[4.5rem] sm:top-0 left-0 right-0 bg-white w-full sm:w-4/5 sm:min-w-[40rem] xl:w-[45rem] xl:pt-[2.0625rem] xl:pl-[9.875rem] sm:pl-[1.875rem] sm:pt-[2.125rem] sm:pr-[1.125rem] sm:h-screen flex flex-col rounded-br-[1.25rem] rounded-tr-[1.25rem]'>
      <div className='sm:hidden pt-6 px-6'>
        <GoBackButton />
      </div>
      <div className='sm:pt-6 px-6 pt-0 xl:px-0'>
        <div className='mt-[1.25rem] sm:mt-[4.9375rem] sm:pl-[0.0625rem] xl:mt-0 xl:pl-0'>
          <FormTitle>
            Edit <span className='text-[#888EB0]'>#</span>
            {invoice.id}
          </FormTitle>
        </div>
      </div>
      <div className='flex-1 sm:overflow-y-scroll overflow-x-hidden sm:mt-[1.0625rem] xl:mt-[2.5rem]'>
        <FullInvoiceForm onSubmit={onSubmit} invoice={invoice} />
      </div>
    </div>
  )
}
