import { Product } from '@invoice/domain'
import Input from '../../Input'
import { DeleteIcon } from '@/assets/icons'

export default function ProductRow({ product }: { product: Product['data'] }) {
  return (
    <tr className='grid xl:grid-cols-desktop_product sm:grid-cols-tablet_product gap-[16px] text-left'>
      <th>
        <Input
          name={`product-name-${product.id}`}
          defaultValue={product.name}
        />
      </th>
      <th>
        <Input
          name={`product-quantity-${product.id}`}
          defaultValue={product.quantity}
        />
      </th>
      <th>
        <Input
          name={`product-price-${product.id}`}
          defaultValue={parseFloat(product.unitPrice).toFixed(2)}
        />
      </th>
      <th>
        <p className='text-[15px] tracking-[-0.25px] font-bold text-[#888EB0] mt-[14px]'>
          {(
            parseFloat(product.unitPrice) * parseFloat(product.quantity)
          ).toFixed(2)}
        </p>
      </th>
      <th>
        <button className='mt-[15px] ml-[10px]'>
          <DeleteIcon />
        </button>
      </th>
    </tr>
  )
}
