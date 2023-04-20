import InvoiceStatus from '../InvoiceStatus'

export default function InvoiceHeader() {
  return (
    <div className='mt-[27px] bg-white flex rounded-lg'>
      <div className='flex flex-1 items-center justify-between p-6 pb-[27px]'>
        <p className='text-[13px] text-[#858BB2] tracking-[-0.1px] mt-[2px]'>
          Status
        </p>
        <InvoiceStatus status='pending' />
      </div>
    </div>
  )
}
