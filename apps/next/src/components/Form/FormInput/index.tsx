import { PropsWithChildren } from 'react'

export default function FormInput({
  name,
  defaultValue,
  label,
  className = '',
  Icon,
}: PropsWithChildren & {
  name: string
  defaultValue: string
  label: string
  className?: string
  Icon?: JSX.Element
}) {
  const finalClassName = `flex flex-col relative ${className}`
  return (
    <div className={finalClassName}>
      <label
        htmlFor={`sender-${name}`}
        className='text-[13px] tracking-[-0.1px] font-medium text-[#7E88C3]'
      >
        {label}
      </label>
      <input
        id={`sender-${name}`}
        className='text-[15px] tracking-[-0.25px] font-bold leading-[15px] mt-[6px] px-[20px] pt-[17px] pb-[15px] border rounded-[4px]'
        type='text'
        value={defaultValue}
      ></input>
      {Icon ? Icon : null}
    </div>
  )
}
