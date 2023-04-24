import Input from '@/components/Form/Input'
import Label from '@/components/Form/Label'
import { Address } from '@invoice/domain'

export default function AddressInputs({
  target,
  address,
}: {
  target: string
  address: Address['data']
}) {
  return (
    <div
      id={target}
      className='sm:grid sm:grid-cols-3 gap-x-[1.5rem] sm:gap-x-[1.5rem]'
    >
      <div className='flex flex-col gap-[0.375rem] sm:col-span-3'>
        <Label name={`${target}-street`}>Street Address</Label>
        <Input name={`${target}-street`} defaultValue={address.street} />
      </div>
      <div className='grid grid-cols-2 gap-y-[0.375rem] gap-x-6 mt-[1.5rem] sm:mt-[1.4375rem]  sm:col-span-2'>
        <div className='flex flex-col gap-[0.4375rem]'>
          <Label name={`${target}-city`}>City</Label>
          <Input name={`${target}-city`} defaultValue={address.city} />
        </div>
        <div className='flex flex-col gap-[0.4375rem]'>
          <Label name={`${target}-zip`}>Post Code</Label>
          <Input name={`${target}-zip`} defaultValue={address.zip} />
        </div>
      </div>
      <div className='flex flex-col gap-[0.4375rem] mt-[1.4375rem] sm:mt-[1.4375rem]'>
        <Label name={`${target}-country`}>Country</Label>
        <Input name={`${target}-country`} defaultValue={address.country} />
      </div>
    </div>
  )
}
