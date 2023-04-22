import { PlusIcon } from '@/assets/icons'
import ArrowDown from '@/assets/icons/arrow-down'
import ArrowUp from '@/assets/icons/arrow-up'
import { useState } from 'react'

export default function FilterBar() {
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <div className='flex justify-between items-center xl:pt-[37px]'>
      <div className='flex flex-col py-[5px]'>
        <strong className='text-[1.5rem] text-[#0C0E16] tracking-[-0.046875rem] xl:text-[36px] xl:tracking-[-1.13px]'>
          Invoices
        </strong>
        <span className='text-[0.8125rem] mt-[-6px] text-[#888EB0]'>
          <span className='hidden xl:inline'>There are </span>7
          <span className='hidden xl:inline'> total</span> invoices
        </span>
      </div>
      <div className='flex justify-center items-center gap-[17px] xl:gap-[37px] cursor-pointer'>
        <div
          onClick={() => {
            setFilterOpen((filter) => !filter)
          }}
          className={`mt-[2px] flex items-center ${
            filterOpen ? 'gap-[2px] xl:gap-[5px]' : 'gap-[11px] xl:gap-[14px]'
          }`}
        >
          <p>
            <strong className='text-[0.9375rem] tracking-[-0.015625rem]'>
              Filter
              <span className='hidden sm:inline'> by status</span>
            </strong>
          </p>
          <div className='text-[#7C5DFA]'>
            {filterOpen ? <ArrowUp /> : <ArrowDown />}
          </div>
        </div>
        <button className='flex items-center justify-center bg-[#7C5DFA] p-[6px] xl:p-2 xl:pr-[18px] pr-[0.99rem] rounded-3xl gap-2 sm:gap-4'>
          <span className='h-8 w-8 flex items-center justify-center bg-white rounded-full'>
            <PlusIcon />
          </span>
          <p className='mt-[2px] xl:mt-[4px] font-bold text-[0.9375rem] tracking-[-0.015625rem] text-[#fff]'>
            New
            <span className='hidden sm:inline'> Invoice</span>
          </p>
        </button>
      </div>
    </div>
  )
}
