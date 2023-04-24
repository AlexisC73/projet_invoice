import { PropsWithChildren } from 'react'

export default function FormSectionTitle({ children }: PropsWithChildren) {
  return (
    <p className='text-[0.9375rem] tracking-[-0.015625rem] font-bold text-[#7C5DFA]'>
      {children}
    </p>
  )
}
