import ArrowDown from '@/assets/icons/arrow-down'
import { PropsWithChildren } from 'react'

export default function PaymentTermsSelect({
  name,
}: PropsWithChildren<{ name: string }>) {
  return (
    <div className='relative w-full border rounded-[4px] h-12 mt-[5px] text-[15px] tracking-[-0.25px] font-bold'>
      <input type='date' className='hidden' id={name} />
      <p className='mt-[14px] ml-[19px]'>Net 30 Days</p>
      <div className='absolute top-[20px] right-[13px]'>
        <ArrowDown />
      </div>
    </div>
  )
}
