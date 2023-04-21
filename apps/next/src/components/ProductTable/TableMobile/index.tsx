import { Invoice } from '@invoice/domain'

export default function ProductMobile({
  invoice,
}: {
  invoice: Invoice['data']
}) {
  return (
    <table className='bg-[#F9FAFE] mt-[36px] w-full flex flex-col rounded-lg overflow-hidden'>
      <tbody className='flex flex-col justify-between flex-1 p-5 gap-[14px]'>
        {invoice.products.map((product) => (
          <tr
            key={product.id}
            className='flex-1 flex justify-between items-center font-bold text-[0.9375rem] tracking-[-0.25px] ml-[3px]'
          >
            <td>
              <p className=''>{product.name}</p>
              <p className='mt-[1px] text-[#7E88C3]'>
                {product.quantity} x £ {product.unitPrice}.00
              </p>
            </td>
            <td>
              <p className='pr-[3px]'>
                £ {parseInt(product.unitPrice) * parseInt(product.quantity)}
                .00
              </p>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot className='flex items-center h-20 bg-[#373B53] mt-[-2px]'>
        <tr className='flex justify-between flex-1 p-5 items-center font-bold text-[0.9375rem] tracking-[-0.25px] ml-[3px] text-white mt-[3px]'>
          <td>
            <p className='text-[0.8125rem] tracking-[-0.1px] font-medium mt-[-1px]'>
              Grand Total
            </p>
          </td>
          <td>
            <p className='text-[1.5rem] tracking-[-0.5px] mr-[3px] mt-[1px]'>
              £ 556.00
            </p>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
