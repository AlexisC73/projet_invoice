import { DekstopHeaderIcon, HeaderIcon, MoonIcon } from '@/assets/icons'
import avatar from '@/assets/images/avatar.jpg'
import Image from 'next/image'

export default function Header() {
  return (
    <header className='bg-[#373B53] h-[72px] w-full flex justify-between sm:h-[79px] xl:fixed xl:left-0 xl:flex-col xl:h-screen xl:w-[103px] xl:rounded-tr-[20px] xl:rounded-br-[20px] z-50'>
      <div className='logo text-[72px] sm:hidden'>
        <HeaderIcon />
      </div>
      <div className='logo text-[79px] overflow-hidden rounded-br-[20px] hidden sm:block xl:hidden'>
        <HeaderIcon />
      </div>
      <div className='logo xl:text-[103px] hidden xl:block'>
        <DekstopHeaderIcon />
      </div>
      <div className='flex items-center xl:flex-col xl:gap-8'>
        <div className='text-[20px] mx-6'>
          <MoonIcon />
        </div>

        <div className='border-l-[1px] h-full flex items-center border-[#494E6E] xl:w-full xl:justify-center xl:border-l-0 xl:border-t-[1px]'>
          <Image
            src={avatar}
            alt='avatar'
            width={32}
            height={32}
            className='rounded-full mx-6 xl:mx-0 my-6 xl:hidden'
          />
          <Image
            src={avatar}
            alt='avatar'
            width={40}
            height={40}
            className='rounded-full mx-6 xl:mx-0 my-6 max-xl:hidden'
          />
        </div>
      </div>
    </header>
  )
}
