import ArrowDown from '@/assets/icons/arrow-down'
import { PropsWithChildren } from 'react'

export default function PaymentTermsSelect({
  name,
}: PropsWithChildren<{ name: string }>) {
  return (
    <div className='relative w-full border rounded-[0.25rem] h-12 mt-[0.3125rem] dark:border-[#252945] dark:bg-[#1E2139] text-[0.9375rem] tracking-[-0.015625rem] font-bold'>
      <input type='date' className='hidden' id={name} />
      <p className='mt-[0.875rem] ml-[1.1875rem] dark:text-white'>
        Net 30 Days
      </p>
      <div className='absolute top-[1.25rem] right-[0.8125rem]'>
        <ArrowDown />
      </div>
    </div>
  )
}
