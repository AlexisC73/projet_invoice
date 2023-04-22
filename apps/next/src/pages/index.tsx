import GoBackButton from '@/components/ui/GoBackButton'
import Header from '@/components/Header/Header'
import data from '@/data/invoices.json'
import FullForm from '@/components/FullForm'

export default function Home() {
  const invoice = data[0]
  return (
    <main className='flex flex-col lg:flex-row justify-center min-h-screen bg-[#F8F8FB] pb-[2000px]'>
      <Header />
      <section id='content' className='flex-1'>
        <div className='p-6 lg:p-0 lg:pt-6 w-full lg:max-w-[730px] lg:mx-auto'></div>
      </section>
      <div className='sm:pt-8'>
        <GoBackButton />
        <FullForm invoice={invoice} />
      </div>
    </main>
  )
}
