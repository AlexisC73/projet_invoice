import GoBackButton from '@/components/GoBackButton'
import Header from '@/components/Header/Header'
import InvoiceHeader from '@/components/InvoiceHeader'
import ProductTable from '@/components/ProductTable/ProductTable'
import ProductMobile from '@/components/ProductTable/TableMobile'
import AddressInfo from '@/components/ui/AddressInfo'
import data from '@/data/invoices.json'

const uppercaseEachWordOfString = (sentence: string) => {
  return sentence
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// format a date to DD MM YYYY string en anglais
const formatDate = (date: string) => {
  const dateObj = new Date(date)
  const monght = dateObj.toLocaleDateString('en-US', {
    month: 'short',
  })
  return `${dateObj.getDate()} ${monght} ${dateObj.getFullYear()}`
}

export default function Home() {
  const invoice = data[0]
  return (
    <main className='flex flex-col lg:flex-row justify-center min-h-screen bg-[#F8F8FB] pb-96'>
      <Header />
      <section id='content' className='flex-1'>
        <div className='p-6 lg:p-0 lg:pt-6 w-full lg:max-w-[730px] lg:mx-auto'>
          <div className='sm:pt-8'>
            <GoBackButton />
            <InvoiceHeader />

            <div className='bg-white rounded-lg sm:mt-6'>
              <div className='mt-4 p-6 sm:px-12 sm:py-[50px] sm:grid sm:grid-cols-2'>
                <div className='mt-[-3px] sm:mt-[1px]'>
                  <p className='text-[0.9375rem] tracking-[-0.015rem] font-bold'>
                    <span className='text-[#7E88C3]'>#</span>
                    {invoice.id}
                  </p>
                  <p className='text-[0.8125rem] text-[#7E88C3] mt-[-1px] sm:mt-[5px]'>
                    {uppercaseEachWordOfString(invoice.description)}
                  </p>
                </div>
                <div className='mt-[26px] sm:mt-[-2px]'>
                  <AddressInfo address={invoice.sender} align='right' />
                </div>

                <div
                  id='mid-grid'
                  className='grid grid-cols-2 mt-[26px] sm:mt-[17px]'
                >
                  <div id='left-grid'>
                    <div className='mt-[3px]'>
                      <p className='text-[0.8125rem] text-[#7E88C3] tracking-[-0.1px] font-medium'>
                        Invoice Date
                      </p>
                      <p className='text-[0.9375rem] font-bold tracking-[-0.25px] mt-[10px]'>
                        {formatDate(invoice.date)}
                      </p>
                    </div>
                    <div className='mt-[27px]'>
                      <p className='text-[0.8125rem] text-[#7E88C3] tracking-[-0.1px] font-medium'>
                        Payment Due
                      </p>
                      <p className='text-[0.9375rem] font-bold tracking-[-0.25px] mt-[10px]'>
                        {formatDate(invoice.dueDate)}
                      </p>
                    </div>
                  </div>
                  <div id='right-grid' className='sm:pl-[38px]'>
                    <p className='text-[0.8125rem] text-[#7E88C3] tracking-[-0.1px] mt-[3px]'>
                      Bill To
                    </p>
                    <p className='text-[0.9375rem] font-bold mt-[10px] tracking-[-0.25px]'>
                      {invoice.buyer.name}
                    </p>
                    <div className='mt-[4px] sm:mt-[3px]'>
                      <AddressInfo address={invoice.buyer.address} />
                    </div>
                  </div>
                </div>
                <div
                  id='sent-to'
                  className='mt-[30px] flex flex-col gap-[10px] sm:mt-[19px] sm:pl-[82px]'
                >
                  <p className='text-[0.8125rem] text-[#7E88C3] tracking-[-0.1px] font-medium'>
                    Sent to
                  </p>
                  <p className='text-[0.9375rem] tracking-[-0.25px] font-bold'>
                    {invoice.contact}
                  </p>
                </div>
                <div className='sm:hidden'>
                  <ProductMobile invoice={invoice} />
                </div>
                <div className='hidden sm:block col-span-2 mt-[44px]'>
                  <ProductTable products={invoice.products} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
