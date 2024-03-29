import {
  DekstopHeaderIcon,
  HeaderIcon,
  MoonIcon,
  SunIcon,
} from '@/assets/icons'
import avatar from '@/assets/images/avatar.jpg'
import ThemeCtx from '@/context/theme'
import Image from 'next/image'
import { useContext } from 'react'

export default function Header() {
  const { toggleDarkMode } = useContext(ThemeCtx)
  return (
    <header className='bg-[#373B53] h-[4.5rem] w-full flex justify-between sm:h-[4.9375rem] xl:fixed xl:left-0 xl:flex-col xl:h-screen xl:w-[6.4375rem] xl:rounded-tr-[1.25rem] xl:rounded-br-[1.25rem] z-50'>
      <div className='logo text-[4.5rem] sm:hidden'>
        <HeaderIcon />
      </div>
      <div className='logo text-[4.9375rem] overflow-hidden rounded-br-[1.25rem] hidden sm:block xl:hidden'>
        <HeaderIcon />
      </div>
      <div className='logo xl:text-[6.4375rem] hidden xl:block'>
        <DekstopHeaderIcon />
      </div>
      <div className='flex items-center xl:flex-col xl:gap-8'>
        <div className='text-[1.25rem] mx-6 flex items-center'>
          <button onClick={toggleDarkMode} className='dark:hidden'>
            <MoonIcon />
          </button>
          <button onClick={toggleDarkMode} className='hidden dark:inline'>
            <SunIcon />
          </button>
        </div>

        <div className='border-l-[0.0625rem] h-full flex items-center border-[#494E6E] xl:w-full xl:justify-center xl:border-l-0 xl:border-t-[0.0625rem]'>
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
