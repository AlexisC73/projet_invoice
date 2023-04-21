import ActionButton from '../ui/ActionButton'
import InvoiceStatus from '../InvoiceStatus'

export default function InvoiceHeader() {
  return (
    <div className='mt-[27px] bg-white flex rounded-lg items-center sm:px-2 sm:pr-8 sm:justify-between'>
      <div className='flex flex-1 items-center justify-between p-6 pb-[27px] sm:pb-[24px] sm:max-w-[206px]'>
        <p className='text-[13px] text-[#858BB2] tracking-[-0.1px] mt-[2px]'>
          Status
        </p>
        <InvoiceStatus status='pending' />
      </div>
      <div className='hidden sm:flex gap-2'>
        <ActionButton action='edit' />
        <ActionButton action='delete' />
        <ActionButton action='Mark as Paid' />
      </div>
    </div>
  )
}
