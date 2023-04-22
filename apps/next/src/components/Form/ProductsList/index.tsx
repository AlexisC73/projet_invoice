import { Product } from '@invoice/domain/dist'
import ProductLi from './ProductLi'

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
      <ul className='mt-[23px] flex flex-col gap-[47px]'>
        {products.map((product) => (
          <ProductLi product={product} />
        ))}
      </ul>
      <button className='text-[15px] tracking-[-0.25px] font-bold text-[#7E88C3] w-full bg-[#F9FAFE] mt-[47px] pt-[15px] pb-[11px] rounded-3xl'>
        + Add New Item
      </button>
    </div>
  )
}
