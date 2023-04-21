import { PropsWithChildren } from 'react'

export default function FormTitle({ children }: PropsWithChildren) {
  return <p className='text-[24px] tracking-[-0.5px] font-bold'>{children}</p>
}
