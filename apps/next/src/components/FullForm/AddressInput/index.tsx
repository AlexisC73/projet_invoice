import Input from '@/components/Form/Input'
import Label from '@/components/Form/Label'
import { Address } from '@invoice/domain'

export default function AddressInput({
  target,
  address,
}: {
  target: string
  address: Address['data']
}) {
  return (
    <div id={target}>
      <div className='flex flex-col gap-[6px]'>
        <Label name={`${target}-street`}>Street Address</Label>
        <Input name={`${target}-street`} defaultValue={address.street} />
      </div>
      <div className='grid grid-cols-2 gap-y-[6px] gap-x-6 mt-[23px]'>
        <div className='flex flex-col gap-[6px]'>
          <Label name={`${target}-city`}>City</Label>
          <Input name={`${target}-city`} defaultValue={address.city} />
        </div>
        <div className='flex flex-col gap-[6px]'>
          <Label name={`${target}-zip`}>Post Code</Label>
          <Input name={`${target}-zip`} defaultValue={address.zip} />
        </div>
      </div>
      <div className='flex flex-col gap-[6px] mt-[24px]'>
        <Label name={`${target}-country`}>Country</Label>
        <Input name={`${target}-country`} defaultValue={address.country} />
      </div>
    </div>
  )
}
