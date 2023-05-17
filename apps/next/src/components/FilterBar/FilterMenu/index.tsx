import ArrowDown from '@/assets/icons/arrow-down'
import ArrowUp from '@/assets/icons/arrow-up'
import { Dispatch, SetStateAction, useState } from 'react'

const FILTERS = ['draft', 'pending', 'paid']

export default function FilterMenu({
  actualFilter,
  setFilter,
}: {
  actualFilter: string[]
  setFilter: Dispatch<SetStateAction<string[]>>
}) {
  const [filterOpen, setFilterOpen] = useState(false)

  const toggleFilter = (filter: string) => {
    if (actualFilter.includes(filter)) {
      setFilter((prev) => prev.filter((item) => item !== filter))
    } else {
      setFilter((prev) => [...prev, filter])
    }
  }

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
      {filterOpen && (
        <ul
          className='absolute bg-white top-8 z-10'
          onClick={(e) => e.stopPropagation()}
          onMouseLeave={() => setFilterOpen(false)}
        >
          {FILTERS.map((filter) => (
            <FilterItem
              filter={filter}
              toggleFilter={() => toggleFilter(filter)}
              checked={actualFilter.includes(filter)}
            />
          ))}
        </ul>
      )}
    </button>
  )
}

const FilterItem = ({
  filter,
  checked,
  toggleFilter,
}: {
  filter: string
  checked: boolean
  toggleFilter: () => void
}) => {
  return (
    <li className='flex gap-2' role='checkbox' onClick={toggleFilter}>
      <CustomCheckbox checked={checked} />
      <p className='text-[0.9375rem] tracking-[-0.015625rem] font-bold dark:text-white'>
        {filter.charAt(0).toUpperCase() + filter.slice(1)}
      </p>
    </li>
  )
}

const CustomCheckbox = ({ checked }: { checked?: boolean }) => {
  const customClassName = `${checked ? 'bg-green-300' : 'bg-red-300'} h-5 w-5`
  return <button className={customClassName}></button>
}
