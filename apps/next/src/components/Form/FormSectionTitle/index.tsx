import { PropsWithChildren } from 'react'

export default function FormSectionTitle({ children }: PropsWithChildren) {
  return (
    <p className='text-[15px] tracking-[-0.25px] font-bold text-[#7C5DFA]'>
      {children}
    </p>
  )
}
