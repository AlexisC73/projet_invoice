import { Product } from '@invoice/domain'
import Input from '../../Input'
import { DeleteIcon } from '@/assets/icons'

export default function ProductRow({
  product,
  onDelete,
  onUpdate,
}: {
  product: Product['data']
  onDelete: (id: string) => void
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
    <tr className='grid xl:grid-cols-desktop_product sm:grid-cols-tablet_product gap-[1rem] text-left'>
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
          onChange={handleUpdate}
        />
      </th>
      <th>
        <Input
          name={`product-unitPrice-${product.id}`}
          defaultValue={parseFloat(product.unitPrice).toFixed(2)}
          onChange={handleUpdate}
        />
      </th>
      <th>
        <p className='text-[0.9375rem] tracking-[-0.015625rem] font-bold text-[#888EB0] dark:text-[#DFE3FA] mt-[0.875rem]'>
          {(
            parseFloat(product.unitPrice) * parseFloat(product.quantity)
          ).toFixed(2)}
        </p>
      </th>
      <th>
        <button
          onClick={() => onDelete(product.id)}
          type='button'
          className='mt-[0.9375rem] ml-[0.625rem]'
        >
          <DeleteIcon />
        </button>
      </th>
    </tr>
  )
}
