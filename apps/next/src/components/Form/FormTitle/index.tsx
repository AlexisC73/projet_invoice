import { PropsWithChildren } from 'react'

export default function FormTitle({ children }: PropsWithChildren) {
  return (
    <p className='text-[1.5rem] tracking-[-0.03125rem] font-bold'>{children}</p>
  )
}
