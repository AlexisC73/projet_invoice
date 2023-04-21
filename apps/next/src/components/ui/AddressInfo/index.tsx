import { Address } from '@invoice/domain'

export default function AddressInfo({
  address,
  align = 'left',
}: {
  address: Address['data']
  align?: 'left' | 'right'
}) {
  const className = `text-[#7E88C3] text-[0.8125rem] leading-[19px] ${
    align === 'right' ? 'sm:text-right' : ''
  }`
  return (
    <div className={className}>
      <p>{address.street}</p>
      <p>{address.city}</p>
      <p>{address.zip}</p>
      <p>{address.country}</p>
    </div>
  )
}
