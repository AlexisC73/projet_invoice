import { Product } from '@invoice/domain'
import Label from '../../Label'
import Input from '../../Input'
import { DeleteIcon } from '@/assets/icons'

export default function ProductLi({
  product,
  onUpdate,
}: {
  product: Product['data']
  onUpdate: (id: string, updatedProduct: Product['data']) => void
}) {
  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const [_, type, id] = name.split('-')

    onUpdate(id, {
      ...product,
      [type]: value,
    })
  }
  return (
    <li className='flex flex-col'>
      <div className='flex flex-col gap-[0.8125rem]'>
        <Label name={`product-name-${product.id}`}>Item Name</Label>
        <Input
          name={`product-name-${product.id}`}
          defaultValue={product.name}
        />
      </div>
      <div className='grid grid-cols-mobile_product gap-4 mt-[1.4375rem]'>
        <div className='flex flex-col gap-[0.4375rem]'>
          <Label name={`product-quantity-${product.id}`}>Qty.</Label>
          <Input
            name={`product-quantity-${product.id}`}
            defaultValue={product.quantity}
            onChange={handleUpdate}
          />
        </div>
        <div className='flex flex-col gap-[0.4375rem]'>
          <Label name={`product-price-${product.id}`}>Price</Label>
          <Input
            name={`product-unitPrice-${product.id}`}
            defaultValue={parseFloat(product.unitPrice).toString()}
            onChange={handleUpdate}
          />
        </div>
        <div className='flex flex-col gap-[0.4375rem]'>
          <Label name={`product-total-${product.id}`}>Total</Label>
          <p className='text-[0.9375rem] tracking-[-0.015625rem] text-[#888EB0] font-bold mt-[0.875rem]'>
            {(
              parseFloat(product.quantity) * parseFloat(product.unitPrice)
            ).toFixed(2)}
          </p>
        </div>
        <button className='mt-[2.625rem] mx-auto'>
          <DeleteIcon />
        </button>
      </div>
    </li>
  )
}
