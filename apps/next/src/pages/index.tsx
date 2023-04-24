import FilterBar from '@/components/FilterBar'
import SideForm from '@/components/Form/SideForm'
import Header from '@/components/Header/Header'
import InvoiceLi from '@/components/InvoiceLi'
import data from '@/data/invoices.json'

export default function Home() {
  const invoices = data
  return (
    <main className='flex flex-col xl:flex-row justify-center min-h-screen bg-[#F8F8FB]'>
      <Header />
      <section id='content' className='flex-1'>
        <div className='p-6 xl:p-0 xl:pt-6 w-full xl:max-w-[45.625rem] xl:mx-auto'></div>
      </section>
    </main>
  )
}
