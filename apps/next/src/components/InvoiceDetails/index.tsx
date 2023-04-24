import { Invoice } from '@invoice/domain'
import AddressInfo from './AddressInfo'
import ProductTable from '../ProductTable/ProductTable'
import ProductMobile from '../ProductTable/TableMobile'
import { formatDate } from '@/utils'

export default function InvoiceDetails({
  invoice,
}: {
  invoice: Invoice['data']
}) {
  return (
    <div className='bg-white rounded-lg sm:mt-6'>
      <div className='mt-4 p-6 sm:px-12 sm:py-[3.125rem] sm:grid sm:grid-cols-2'>
        <div className='mt-[-0.1875rem] sm:mt-[0.0625rem]'>
          <p className='text-[0.9375rem] tracking-[-0.015rem] font-bold'>
            <span className='text-[#7E88C3]'>#</span>
            {invoice.id}
          </p>
          <p className='text-[0.8125rem] text-[#7E88C3] mt-[-0.0625rem] sm:mt-[0.3125rem]'>
            {invoice.description ? invoice.description : ''}
          </p>
        </div>
        <div className='mt-[1.625rem] sm:mt-[-0.125rem]'>
          <AddressInfo address={invoice.sender} align='right' />
        </div>

        <div
          id='mid-grid'
          className='grid grid-cols-2 mt-[1.625rem] sm:mt-[1.0625rem]'
        >
          <div id='left-grid'>
            <div className='mt-[0.1875rem]'>
              <p className='text-[0.8125rem] text-[#7E88C3] tracking-[-0.00625rem] font-medium'>
                Invoice Date
              </p>
              <p className='text-[0.9375rem] font-bold tracking-[-0.015625rem] mt-[0.625rem]'>
                {formatDate(invoice.date)}
              </p>
            </div>
            <div className='mt-[1.6875rem]'>
              <p className='text-[0.8125rem] text-[#7E88C3] tracking-[-0.00625rem] font-medium'>
                Payment Due
              </p>
              <p className='text-[0.9375rem] font-bold tracking-[-0.015625rem] mt-[0.625rem]'>
                {formatDate(invoice.dueDate)}
              </p>
            </div>
          </div>
          <div id='right-grid' className='sm:pl-[2.375rem]'>
            <p className='text-[0.8125rem] text-[#7E88C3] tracking-[-0.00625rem] mt-[0.1875rem]'>
              Bill To
            </p>
            <p className='text-[0.9375rem] font-bold mt-[0.625rem] tracking-[-0.015625rem]'>
              {invoice.buyer.name}
            </p>
            <div className='mt-[0.25rem] sm:mt-[0.1875rem]'>
              <AddressInfo address={invoice.buyer.address} />
            </div>
          </div>
        </div>
        <div
          id='sent-to'
          className='mt-[1.875rem] flex flex-col gap-[0.625rem] sm:mt-[1.1875rem] sm:pl-[5.125rem]'
        >
          <p className='text-[0.8125rem] text-[#7E88C3] tracking-[-0.00625rem] font-medium'>
            Sent to
          </p>
          <p className='text-[0.9375rem] tracking-[-0.015625rem] font-bold'>
            {invoice.contact}
          </p>
        </div>
        <div className='sm:hidden'>
          <ProductMobile invoice={invoice} />
        </div>
        <div className='hidden sm:block col-span-2 mt-[2.75rem]'>
          <ProductTable products={invoice.products} />
        </div>
      </div>
    </div>
  )
}
