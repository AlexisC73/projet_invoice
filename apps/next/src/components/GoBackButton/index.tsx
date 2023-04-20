import ArrowLeft from '@/assets/icons/arrow-left'
import Link from 'next/link'

export default function GoBackButton() {
  return (
    <Link href='/' className='flex items-center mt-[4px] gap-[21px] sm:hidden'>
      <ArrowLeft />
      <p className='text-[0.9375rem] tracking-[-0.015625rem] mt-[1px] font-bold'>
        Go back
      </p>
    </Link>
  )
}
