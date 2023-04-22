import { CalendarIcon } from '@/assets/icons'
import { PropsWithChildren } from 'react'

export default function DatePickerInput({
  name,
}: PropsWithChildren<{ name: string }>) {
  return (
    <div className='relative w-full border rounded-[4px] h-12 mt-[5px] text-[15px] tracking-[-0.25px] font-bold'>
      <input type='text' className='hidden' id={name} />
      <p className='mt-[13px] ml-[19px]'>21 Aug 2021</p>
      <div className='absolute top-[15px] right-[14px]'>
        <CalendarIcon />
      </div>
    </div>
  )
}
