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
      <p className='text-[1.125rem] font-bold tracking-[-0.02375rem] text-[#777F98]'>
        Item List
      </p>
      <ul className='mt-[1.4375rem] flex flex-col gap-[2.9375rem] sm:hidden'>
        {products.map((product) => (
          <ProductLi product={product} />
        ))}
      </ul>
      <table className='hidden sm:flex mt-[0.8125rem] flex-col'>
        <thead className='flex'>
          <tr className='grid xl:grid-cols-desktop_product sm:grid-cols-tablet_product gap-[1rem] text-left w-full'>
            <th className='text-[0.8125rem] tracking-[-0.00625rem] font-medium text-[#7E88C3]'>
              Item Name
            </th>
            <th className='text-[0.8125rem] tracking-[-0.00625rem] font-medium text-[#7E88C3]'>
              Qty.
            </th>
            <th className='text-[0.8125rem] tracking-[-0.00625rem] font-medium text-[#7E88C3]'>
              Price
            </th>
            <th className='text-[0.8125rem] tracking-[-0.00625rem] font-medium text-[#7E88C3]'>
              Total
            </th>
          </tr>
        </thead>
        <tbody className='flex flex-col py-[0.6875rem] gap-y-[0.9375rem]'>
          {products.map((product) => (
            <ProductRow product={product} />
          ))}
        </tbody>
      </table>
      <button className='text-[0.9375rem] tracking-[-0.015625rem] font-bold text-[#7E88C3] w-full bg-[#F9FAFE] mt-[2.9375rem] pt-[0.9375rem] pb-[0.6875rem] rounded-3xl sm:mt-[0.375rem]'>
        + Add New Item
      </button>
    </div>
  )
}
