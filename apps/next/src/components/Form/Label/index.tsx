import { PropsWithChildren } from 'react'

export default function Label({
  name,
  children,
}: PropsWithChildren & { name: string }) {
  return (
    <label
      htmlFor={name}
      className='text-[0.8125rem] dark:text-[#DFE3FA] tracking-[-0.00625rem] font-medium text-[#7E88C3]'
    >
      {children}
    </label>
  )
}
