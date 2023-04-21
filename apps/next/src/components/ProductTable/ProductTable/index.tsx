import { Product } from '@invoice/domain'

export default function ProductTable({
  products,
}: {
  products: Product['data'][]
}) {
  return (
    <table className='w-full flex flex-col bg-[#F9FAFE] rounded-lg overflow-hidden'>
      <thead className='flex flex-1 px-8 pt-8'>
        <tr className='flex-1 text-[0.8125rem] tracking-[-0.1px] text-[#7E88C3] grid grid-cols-9'>
          <th className='col-span-4 text-left'>
            <p className='ml-[-1px] font-medium'>Item Name</p>
          </th>
          <th className='col-span-1 text-right font-medium'>
            <p className='mr-[4px]'>QTY.</p>
          </th>
          <th className='col-span-2 text-right font-medium'>
            <p className='mr-[13px]'>Price</p>
          </th>
          <th className='col-span-2 text-right font-medium'>
            <p className='mr-[1px]'>Total</p>
          </th>
        </tr>
      </thead>
      <tbody className='flex flex-1 flex-col mt-[25px] gap-[23px] px-8 pb-8'>
        {products.map((product) => (
          <tr
            key={product.id}
            className='flex-1 text-[#7E88C3] font-bold grid grid-cols-9 tracking-[-0.25px] text-[0.9375rem]'
          >
            <td className='col-span-4 text-black'>{product.name}</td>
            <td className='col-span-1 text-center pl-[28px]'>
              {product.quantity}
            </td>
            <td className='col-span-2 text-right pr-[10px]'>
              £ {product.unitPrice}.00
            </td>
            <td className='col-span-2 text-right text-black'>£ 400.00</td>
          </tr>
        ))}
      </tbody>
      <tfoot className='bg-[#373B53]'>
        <tr className='flex justify-between flex-1 p-[18px] items-center font-bold text-[0.9375rem] tracking-[-0.25px] ml-[3px] text-white mt-[3px]'>
          <td>
            <p className='text-[0.8125rem] tracking-[-0.1px] font-medium ml-[10px]'>
              Amount Due
            </p>
          </td>
          <td>
            <p className='text-[1.5rem] tracking-[-0.5px] mr-[13px] mt-[6px]'>
              £ 556.00
            </p>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
