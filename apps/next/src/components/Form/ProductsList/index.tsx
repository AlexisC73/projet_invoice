import { Product } from '@invoice/domain/dist'
import ProductLi from './ProductLi'
import ProductRow from './ProductRow'

export default function ProductsList({
  products,
}: {
  products: Product['data'][]
}) {
  return (
    <div>
      <p className='text-[18px] font-bold tracking-[-0.38px] text-[#777F98]'>
        Item List
      </p>
      <ul className='mt-[23px] flex flex-col gap-[47px] sm:hidden'>
        {products.map((product) => (
          <ProductLi product={product} />
        ))}
      </ul>
      <table className='hidden sm:flex mt-[13px] flex-col'>
        <thead className='flex'>
          <tr className='grid xl:grid-cols-desktop_product sm:grid-cols-tablet_product gap-[16px] text-left w-full'>
            <th className='text-[13px] tracking-[-0.1px] font-medium text-[#7E88C3]'>
              Item Name
            </th>
            <th className='text-[13px] tracking-[-0.1px] font-medium text-[#7E88C3]'>
              Qty.
            </th>
            <th className='text-[13px] tracking-[-0.1px] font-medium text-[#7E88C3]'>
              Price
            </th>
            <th className='text-[13px] tracking-[-0.1px] font-medium text-[#7E88C3]'>
              Total
            </th>
          </tr>
        </thead>
        <tbody className='flex flex-col py-[11px] gap-y-[15px]'>
          {products.map((product) => (
            <ProductRow product={product} />
          ))}
        </tbody>
      </table>
      <button className='text-[15px] tracking-[-0.25px] font-bold text-[#7E88C3] w-full bg-[#F9FAFE] mt-[47px] pt-[15px] pb-[11px] rounded-3xl sm:mt-[6px]'>
        + Add New Item
      </button>
    </div>
  )
}
