import { PropsWithChildren } from 'react'

export default function Label({
  name,
  children,
}: PropsWithChildren & { name: string }) {
  return (
    <label
      htmlFor={name}
      className='text-[13px] tracking-[-0.1px] font-medium text-[#7E88C3]'
    >
      {children}
    </label>
  )
}
