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
        className='w-full text-[0.9375rem] tracking-[-0.015625rem] font-bold leading-[0.9375rem] pl-[0.625rem] sm:pl-[1.1875rem] pt-[1.0625rem] pb-[0.9375rem] border rounded-[0.25rem]'
        type='text'
        value={defaultValue || ''}
      ></input>
      {icon ? icon : null}
    </div>
  )
}
