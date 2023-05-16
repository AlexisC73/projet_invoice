import Header from '@/components/Header/Header'
import { PropsWithChildren } from 'react'

export default function HeaderLayout({ children }: PropsWithChildren) {
  return (
    <main className='flex flex-col xl:flex-row justify-center min-h-screen bg-[#F8F8FB] dark:bg-[#141625]'>
      <Header />
      <section id='content' className='flex-1 flex'>
        <div className='p-6 xl:p-0 xl:pt-6 w-full flex-1 xl:max-w-[45.625rem] xl:mx-auto'>
          {children}
        </div>
      </section>
    </main>
  )
}
