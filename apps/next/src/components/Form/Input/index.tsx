export default function Input({
  defaultValue,
  name,
  icon,
}: {
  defaultValue?: string | null
  name: string
  icon?: JSX.Element
}) {
  return (
    <div>
      <input
        id={name}
        className='w-full text-[15px] tracking-[-0.25px] font-bold leading-[15px] px-[19px] pt-[17px] pb-[15px] border rounded-[4px]'
        type='text'
        value={defaultValue || ''}
      ></input>
      {icon ? icon : null}
    </div>
  )
}
