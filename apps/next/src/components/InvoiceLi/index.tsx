import ArrowRight from '@/assets/icons/arrow-right'
import InvoiceStatus from '../ui/InvoiceStatus'
import Link from 'next/link'

type InvoiceLiProps = {
  invoiceLiData: InvoiceLiData
}

export type InvoiceLiData = {
  id: string
  shortId: string
  dueDate: string
  buyerName: string
  totalPrice: number
  status: string
}

export default function InvoiceLi({ invoiceLiData }: InvoiceLiProps) {
  const { id, buyerName, dueDate, status, totalPrice, shortId } = invoiceLiData
  return (
    <li>
      <Link
        href={`/invoice/${id}`}
        className='grid grid-cols-2 bg-white p-6 rounded-lg sm:flex sm:items-center sm:py-[1rem] sm:px-8 sm:gap-10 sm:relative dark:bg-[#1E2139]'
      >
        <p className='text-[0.9375rem] dark:text-white tracking-[-0.015625rem] font-bold mt-[-0.1875rem] sm:mt-[0.1875rem] sm:order-1'>
          <span className='text-[#7E88C3]'>#</span>
          {shortId}
        </p>
        <p className='text-[#858BB2] dark:text-white text-[0.8125rem] text-right mt-[-0.0625rem] sm:mt-[0.25rem] sm:flex-1 sm:text-left sm:order-3 sm:pl-[1.1875rem]'>
          {buyerName}
        </p>
        <p className='mt-[1.1875rem] text-[#7E88C3] dark:text-[#DFE3FA] text-[0.8125rem] sm:mt-[0.25rem] sm:order-2'>
          <span className='text-[#888EB0] dark:text-[#DFE3FA] pr-[0.1875rem] sm:pl-[0.3125rem]'>
            Due
          </span>
          {dueDate}
        </p>
        <div className='row-span-2 flex mt-[1.4375rem] justify-end sm:mt-0 sm:mr-[1.0625rem] sm:order-5'>
          <InvoiceStatus status={status} />
        </div>

        <p className='font-bold text-[0.9375rem] dark:text-white tracking-[-0.015625rem] mt-[0.4375rem] sm:order-4 sm:mt-[0.1875rem]'>
          £ {totalPrice}
        </p>
        <div className='hidden sm:inline sm:absolute right-[1.375rem]'>
          <ArrowRight />
        </div>
      </Link>
    </li>
  )
}
