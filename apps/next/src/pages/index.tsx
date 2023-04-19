import Header from '@/components/Header/Header'
import InvoiceHeaderBar from '@/components/InvoiceHeaderBar'

export default function Home() {
  return (
    <main className='flex flex-col lg:flex-row justify-center min-h-screen'>
      <Header />
      <section id='content' className='flex-1'>
        <div className='p-6 '>
          <InvoiceHeaderBar />
        </div>
      </section>
    </main>
  )
}
