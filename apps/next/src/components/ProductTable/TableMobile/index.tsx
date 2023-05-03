import { Invoice } from '@invoice/domain'

export default function ProductMobile({
  invoice,
}: {
  invoice: Invoice['data']
}) {
  return (
    <table className='bg-[#F9FAFE] dark:bg-[#252945] mt-[2.25rem] w-full flex flex-col rounded-lg overflow-hidden'>
      <tbody className='flex flex-col justify-between flex-1 p-5 gap-[0.875rem]'>
        {invoice.products.map((product) => (
          <tr
            key={product.id}
            className='flex-1 flex justify-between items-center font-bold text-[0.9375rem] tracking-[-0.015625rem] ml-[0.1875rem]'
          >
            <td>
              <p className='dark:text-white'>{product.name}</p>
              <p className='mt-[0.0625rem] dark:text-[#888EB0] text-[#7E88C3]'>
                {product.quantity} x £ {product.unitPrice}.00
              </p>
            </td>
            <td>
              <p className='pr-[0.1875rem] dark:text-white'>
                £ {parseInt(product.unitPrice) * parseInt(product.quantity)}
                .00
              </p>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot className='flex items-center h-20 bg-[#373B53] dark:bg-[#0C0E16] mt-[-0.125rem]'>
        <tr className='flex justify-between flex-1 p-5 items-center font-bold text-[0.9375rem] tracking-[-0.015625rem] ml-[0.1875rem] text-white mt-[0.1875rem]'>
          <td>
            <p className='text-[0.8125rem] tracking-[-0.00625rem] font-medium mt-[-0.0625rem]'>
              Grand Total
            </p>
          </td>
          <td>
            <p className='text-[1.5rem] tracking-[-0.03125rem] mr-[0.1875rem] mt-[0.0625rem]'>
              £ 556.00
            </p>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
