import { CalendarIcon } from '@/assets/icons'
import { PropsWithChildren } from 'react'

export default function DatePickerInput({
  label,
  name,
}: PropsWithChildren<{ label: string; name: string }>) {
  return (
    <div>
      <label
        htmlFor={name}
        className='text-[13px] tracking-[-0.1px] font-medium text-[#7E88C3]'
      >
        {label}
      </label>
      <div className='relative w-full border rounded-[4px] h-12 mt-[5px] text-[15px] tracking-[-0.25px] font-bold'>
        <input type='text' className='hidden' id={name} />
        <p className='mt-[13px] ml-[18px]'>21 Aug 2021</p>
        <div className='absolute top-[15px] right-[14px]'>
          <CalendarIcon />
        </div>
      </div>
    </div>
  )
}
