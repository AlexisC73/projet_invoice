import { Product } from '@invoice/domain'

export default function ProductTable({
  products,
}: {
  products: Product['data'][]
}) {
  return (
    <table className='w-full flex flex-col bg-[#F9FAFE] dark:bg-[#252945] rounded-lg overflow-hidden'>
      <thead className='flex flex-1 px-8 pt-8'>
        <tr className='flex-1 text-[0.8125rem] tracking-[-0.00625rem] text-[#7E88C3] grid grid-cols-9'>
          <th className='col-span-4 text-left'>
            <p className='ml-[-0.0625rem] dark:text-[#DFE3FA] font-medium'>
              Item Name
            </p>
          </th>
          <th className='col-span-1 text-right font-medium'>
            <p className='mr-[0.25rem] dark:text-[#DFE3FA]'>QTY.</p>
          </th>
          <th className='col-span-2 text-right font-medium'>
            <p className='mr-[0.8125rem] dark:text-[#DFE3FA]'>Price</p>
          </th>
          <th className='col-span-2 text-right font-medium'>
            <p className='mr-[0.0625rem] dark:text-[#DFE3FA]'>Total</p>
          </th>
        </tr>
      </thead>
      <tbody className='flex flex-1 flex-col mt-[1.5625rem] gap-[1.4375rem] px-8 pb-8'>
        {products.map((product) => (
          <tr
            key={product.id}
            className='flex-1 text-[#7E88C3] font-bold grid grid-cols-9 tracking-[-0.015625rem] text-[0.9375rem]'
          >
            <td className='col-span-4 text-black dark:text-white'>
              {product.name}
            </td>
            <td className='col-span-1 text-center dark:text-[#DFE3FA] pl-[1.75rem]'>
              {product.quantity}
            </td>
            <td className='col-span-2 text-right dark:text-[#DFE3FA] pr-[0.625rem]'>
              £ {product.unitPrice}.00
            </td>
            <td className='col-span-2 text-right text-black dark:text-white'>
              £ 400.00
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot className='bg-[#373B53] dark:bg-[#0C0E16]'>
        <tr className='flex justify-between flex-1 p-[1.125rem] items-center font-bold text-[0.9375rem] tracking-[-0.015625rem] ml-[0.1875rem] text-white mt-[0.1875rem]'>
          <td>
            <p className='text-[0.8125rem] tracking-[-0.00625rem] font-medium ml-[0.625rem]'>
              Amount Due
            </p>
          </td>
          <td>
            <p className='text-[1.5rem] tracking-[-0.03125rem] mr-[0.8125rem] mt-[0.375rem]'>
              £ 556.00
            </p>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
