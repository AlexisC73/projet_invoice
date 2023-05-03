import ArrowLeft from '@/assets/icons/arrow-left'
import Link from 'next/link'

export default function GoBackButton() {
  return (
    <Link href='/' className='flex items-center mt-[0.25rem] gap-[1.3125rem]'>
      <ArrowLeft />
      <p className='text-[0.9375rem] dark:text-white tracking-[-0.015625rem] mt-[0.0625rem] font-bold'>
        Go back
      </p>
    </Link>
  )
}
