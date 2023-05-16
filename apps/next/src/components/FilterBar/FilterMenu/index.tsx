import ArrowDown from '@/assets/icons/arrow-down'
import ArrowUp from '@/assets/icons/arrow-up'
import { useState } from 'react'

export default function FilterMenu() {
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <button
      onClick={() => {
        setFilterOpen((prev) => !prev)
      }}
      className={`mt-[0.125rem] flex items-center relative ${
        filterOpen
          ? 'gap-[0.125rem] xl:gap-[0.3125rem]'
          : 'gap-[0.6875rem] xl:gap-[0.875rem]'
      }`}
    >
      <p className='text-[0.9375rem] tracking-[-0.015625rem] font-bold dark:text-white'>
        <span className='sm:hidden'>Filter</span>
        <span className='hidden sm:inline'>Filter by status</span>
      </p>
      <div className='text-[#7C5DFA]'>
        {filterOpen ? <ArrowUp /> : <ArrowDown />}
      </div>
    </button>
  )
}
