import { useState } from 'react'
import NewInvoiceButton from './NewInvoiceButton'
import FilterMenu from './FilterMenu'

export default function FilterBar({
  invoiceLength,
  onNewInvoiceButtonClick,
}: {
  invoiceLength: number
  onNewInvoiceButtonClick: () => void
}) {
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <div className='flex justify-between items-center xl:pt-[2.3125rem]'>
      <div className='flex flex-col py-[0.3125rem]'>
        <strong className='text-[1.5rem] text-[#0C0E16] tracking-[-0.046875rem] xl:text-[2.25rem] xl:tracking-[-0.070625rem] dark:text-white'>
          Invoices
        </strong>
        <SubTitleCountInvoice invoiceLength={invoiceLength} />
      </div>
      <div className='flex justify-center items-center gap-[1.0625rem] xl:gap-[2.3125rem] cursor-pointer'>
        <FilterMenu />
        <NewInvoiceButton onNewInvoiceButtonClick={onNewInvoiceButtonClick} />
      </div>
    </div>
  )
}

const SubTitleCountInvoice = ({ invoiceLength }: { invoiceLength: number }) => {
  return (
    <span className='text-[0.8125rem] mt-[-0.375rem] text-[#888EB0] dark:text-[#DFE3FA]'>
      <span className='hidden xl:inline'>
        {invoiceLength > 1 ? 'There are' : 'There is'}{' '}
      </span>
      {invoiceLength}
      {invoiceLength > 1 && (
        <span className='hidden xl:inline'> total</span>
      )}{' '}
      invoice
      {invoiceLength > 1 ? 's' : ''}
    </span>
  )
}
