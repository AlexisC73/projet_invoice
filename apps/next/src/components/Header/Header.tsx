import { DekstopHeaderIcon, HeaderIcon, MoonIcon } from '@/assets/icons'
import avatar from '@/assets/images/avatar.jpg'
import Image from 'next/image'

export default function Header() {
  return (
    <header className='bg-[#373B53] h-[72px] w-full flex justify-between lg:absolute lg:left-0 lg:flex-col lg:h-screen lg:w-[103px] lg:rounded-tr-[20px] lg:rounded-br-[20px]'>
      <div className='logo text-[72px] lg:hidden'>
        <HeaderIcon />
      </div>
      <div className='logo lg:text-[103px] max-lg:hidden'>
        <DekstopHeaderIcon />
      </div>
      <div className='flex items-center lg:flex-col lg:gap-8'>
        <div className='text-[20px] mx-6'>
          <MoonIcon />
        </div>

        <div className='border-l-[1px] h-full flex items-center border-[#494E6E] lg:w-full lg:justify-center lg:border-l-0 lg:border-t-[1px]'>
          <Image
            src={avatar}
            alt='avatar'
            width={32}
            height={32}
            className='rounded-full mx-6 lg:mx-0 my-6 lg:hidden'
          />
          <Image
            src={avatar}
            alt='avatar'
            width={40}
            height={40}
            className='rounded-full mx-6 lg:mx-0 my-6 max-lg:hidden'
          />
        </div>
      </div>
    </header>
  )
}
