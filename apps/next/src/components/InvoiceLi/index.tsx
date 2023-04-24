import ArrowRight from '@/assets/icons/arrow-right'
import InvoiceStatus from '../ui/InvoiceStatus'

export default function InvoiceLi() {
  return (
    <li className='grid grid-cols-2 bg-white p-6 rounded-lg sm:flex sm:items-center sm:py-[1rem] sm:px-8 sm:gap-10 sm:relative'>
      <p className='text-[0.9375rem] tracking-[-0.015625rem] font-bold mt-[-0.1875rem] sm:mt-[0.1875rem] sm:order-1'>
        <span className='text-[#7E88C3]'>#</span>RT3080
      </p>
      <p className='text-[#858BB2] text-[0.8125rem] text-right mt-[-0.0625rem] sm:mt-[0.25rem] sm:flex-1 sm:text-left sm:order-3 sm:pl-[1.1875rem]'>
        Jensen Huang
      </p>
      <p className='mt-[1.1875rem] text-[#7E88C3] text-[0.8125rem] sm:mt-[0.25rem] sm:order-2'>
        <span className='text-[#888EB0] pr-[0.1875rem] sm:pl-[0.3125rem]'>
          Due
        </span>{' '}
        19 Aug 2021
      </p>
      <div className='row-span-2 flex mt-[1.4375rem] justify-end sm:mt-0 sm:mr-[1.0625rem] sm:order-5'>
        <InvoiceStatus status='paid' />
      </div>

      <p className='font-bold text-[0.9375rem] tracking-[-0.015625rem] mt-[0.4375rem] sm:order-4 sm:mt-[0.1875rem]'>
        £ 1,800.90
      </p>
      <div className='hidden sm:inline sm:absolute right-[1.375rem]'>
        <ArrowRight />
      </div>
    </li>
  )
}
