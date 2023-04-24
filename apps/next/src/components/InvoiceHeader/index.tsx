import ActionButton from '../ui/ActionButton'
import InvoiceStatus from '../ui/InvoiceStatus'

export default function InvoiceHeader() {
  return (
    <div className='mt-[1.6875rem] bg-white flex rounded-lg items-center sm:px-2 sm:pr-8 sm:justify-between'>
      <div className='flex flex-1 items-center justify-between p-6 pb-[1.6875rem] sm:pb-[1.5rem] sm:max-w-[12.875rem]'>
        <p className='text-[0.8125rem] text-[#858BB2] tracking-[-0.00625rem] mt-[0.125rem]'>
          Status
        </p>
        <InvoiceStatus status='pending' />
      </div>
      <div className='hidden sm:flex gap-2'>
        <ActionButton type='default' action='edit' />
        <ActionButton action='delete' type='secondary' />
        <ActionButton action='Mark as Paid' type='primary' />
      </div>
    </div>
  )
}
