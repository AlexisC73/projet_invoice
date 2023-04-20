import Header from '@/components/Header/Header'
import InvoiceHeaderBar from '@/components/InvoiceHeaderBar'
import InvoiceLi from '@/components/InvoiceLi'

export default function Home() {
  return (
    <main className='flex flex-col lg:flex-row justify-center min-h-screen bg-[#F8F8FB] pb-96'>
      <Header />
      <section id='content' className='flex-1'>
        <div className='p-6 lg:p-0 lg:pt-6 w-full lg:max-w-[730px] lg:mx-auto'>
          <InvoiceHeaderBar />
          <InvoiceLi />
        </div>
      </section>
    </main>
  )
}
