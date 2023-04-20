import ArrowRight from '@/assets/icons/arrow-right'

export default function InvoiceLi() {
  return (
    <li className='grid grid-cols-2 bg-white mt-[24px] p-6 rounded-lg sm:flex sm:mt-[57px] sm:items-center sm:py-[1rem] sm:px-8 sm:gap-10 sm:relative'>
      <p className='text-[0.9375rem] tracking-[-0.015625rem] font-bold mt-[-3px] sm:mt-[3px] sm:order-1'>
        <span className='text-[#7E88C3]'>#</span>RT3080
      </p>
      <p className='text-[#858BB2] text-[0.8125rem] text-right mt-[-1px] sm:mt-[4px] sm:flex-1 sm:text-left sm:order-3 sm:pl-[19px]'>
        Jensen Huang
      </p>
      <p className='mt-[19px] text-[#7E88C3] text-[0.8125rem] sm:mt-[4px] sm:order-2'>
        <span className='text-[#888EB0] pr-[3px] sm:pl-[5px]'>Due</span> 19 Aug
        2021
      </p>
      <div className='row-span-2 flex mt-[23px] justify-end sm:mt-0 sm:mr-[17px] sm:order-5'>
        <div className='flex items-center px-[30px] gap-[8px] text-[#33D69F] bg-[#33D69F11] rounded-[6px] h-10'>
          <div className='dot w-[8px] h-[8px] rounded-full bg-[#33D69F]'></div>
          <p className='text-[0.9375rem] mt-[1px] tracking-[-0.015625rem] font-bold'>
            Paid
          </p>
        </div>
      </div>
      <p className='font-bold text-[0.9375rem] tracking-[-0.015625rem] mt-[7px] sm:order-4 sm:mt-[3px]'>
        £ 1,800.90
      </p>
      <div className='hidden sm:inline sm:absolute right-[22px]'>
        <ArrowRight />
      </div>
    </li>
  )
}
