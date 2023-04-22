import { Product } from '@invoice/domain'
import Label from '../../Label'
import Input from '../../Input'
import { DeleteIcon } from '@/assets/icons'

export default function ProductLi({ product }: { product: Product['data'] }) {
  return (
    <li className='flex flex-col'>
      <div className='flex flex-col gap-[13px]'>
        <Label name={`product-name-${product.id}`}>Item Name</Label>
        <Input
          name={`product-name-${product.id}`}
          defaultValue={product.name}
        />
      </div>
      <div className='grid grid-cols-mobile_product gap-4 mt-[23px]'>
        <div className='flex flex-col gap-[7px]'>
          <Label name={`product-quantity-${product.id}`}>Qty.</Label>
          <Input
            name={`product-quantity-${product.id}`}
            defaultValue={product.quantity}
          />
        </div>
        <div className='flex flex-col gap-[7px]'>
          <Label name={`product-price-${product.id}`}>Price</Label>
          <Input
            name={`product-price-${product.id}`}
            defaultValue={parseFloat(product.unitPrice).toFixed(2)}
          />
        </div>
        <div className='flex flex-col gap-[7px]'>
          <Label name={`product-total-${product.id}`}>Total</Label>
          <p className='text-[15px] tracking-[-0.25px] text-[#888EB0] font-bold mt-[14px]'>
            {(
              parseFloat(product.quantity) * parseFloat(product.unitPrice)
            ).toFixed(2)}
          </p>
        </div>
        <div className='mt-[42px] mx-auto'>
          <DeleteIcon />
        </div>
      </div>
    </li>
  )
}
