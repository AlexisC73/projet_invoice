import { CalendarIcon } from '@/assets/icons'
import { PropsWithChildren } from 'react'

export default function DatePickerInput({
  name,
}: PropsWithChildren<{ name: string }>) {
  return (
    <div className='relative w-full border rounded-[0.25rem] h-12 mt-[0.3125rem] text-[0.9375rem] tracking-[-0.015625rem] font-bold'>
      <input type='text' className='hidden' id={name} />
      <p className='mt-[0.8125rem] ml-[1.1875rem]'>21 Aug 2021</p>
      <div className='absolute top-[0.9375rem] right-[0.875rem]'>
        <CalendarIcon />
      </div>
    </div>
  )
}
