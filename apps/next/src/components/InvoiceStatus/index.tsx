export default function InvoiceStatus({
  status = 'draft',
}: {
  status?: string
}) {
  const container =
    status.toLowerCase() === 'paid'
      ? `text-[#33D69F] bg-[#33D69F11]`
      : status.toLowerCase() === 'pending'
      ? `text-[#FF8F00] bg-[#FF8F0011]`
      : `text-[#373B53] bg-[#373B5311]`

  const dotColor =
    status.toLowerCase() === 'paid'
      ? 'bg-[#33D69F]'
      : status.toLowerCase() === 'pending'
      ? 'bg-[#FF8F00]'
      : 'bg-[#373B53]'

  const statusText = status.charAt(0).toUpperCase() + status.slice(1)

  return (
    <div
      className={
        `flex items-center justify-center w-[104px] gap-[8px] rounded-[6px] h-10 ` +
        container
      }
    >
      <div className={`dot w-[8px] h-[8px] rounded-full ` + dotColor}></div>
      <p className='text-[0.9375rem] mt-[1px] tracking-[-0.015625rem] font-bold'>
        {statusText}
      </p>
    </div>
  )
}
