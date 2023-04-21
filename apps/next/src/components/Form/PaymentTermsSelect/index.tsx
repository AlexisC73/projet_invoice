import ArrowDown from '@/assets/icons/arrow-down'
import { PropsWithChildren } from 'react'

export default function PaymentTermsSelect({
  label,
  name,
}: PropsWithChildren<{ label: string; name: string }>) {
  return (
    <div>
      <div>
        <label
          htmlFor={name}
          className='text-[13px] tracking-[-0.1px] font-medium text-[#7E88C3]'
        >
          {label}
        </label>
        <div className='relative w-full border rounded-[4px] h-12 mt-[5px] text-[15px] tracking-[-0.25px] font-bold'>
          <input type='date' className='hidden' id={name} />
          <p className='mt-[13px] ml-[18px]'>Net 30 Days</p>
          <div className='absolute top-[18px] right-[12px]'>
            <ArrowDown />
          </div>
        </div>
      </div>
    </div>
  )
}
