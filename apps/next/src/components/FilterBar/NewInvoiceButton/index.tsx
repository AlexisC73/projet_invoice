import { PlusIcon } from '@/assets/icons'

export default function NewInvoiceButton({
  onNewInvoiceButtonClick,
}: {
  onNewInvoiceButtonClick: () => void
}) {
  return (
    <button
      onClick={onNewInvoiceButtonClick}
      className='flex items-center justify-center bg-[#7C5DFA] p-[0.375rem] xl:p-2 xl:pr-[1.125rem] pr-[0.99rem] rounded-3xl gap-2 sm:gap-4'
    >
      <span className='h-8 w-8 flex items-center justify-center bg-white rounded-full'>
        <PlusIcon />
      </span>
      <p className='mt-[0.125rem] xl:mt-[0.25rem] font-bold text-[0.9375rem] tracking-[-0.015625rem] text-[#fff] sm:hidden'>
        New
      </p>
      <p className='hidden sm:inline mt-[0.125rem] xl:mt-[0.25rem] font-bold text-[0.9375rem] tracking-[-0.015625rem] text-[#fff]'>
        New Invoice
      </p>
    </button>
  )
}
