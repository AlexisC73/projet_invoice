export default function Input({
  defaultValue,
  name,
  icon,
  onChange,
}: {
  defaultValue?: string | null
  name: string
  icon?: JSX.Element
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <input
        id={name}
        name={name}
        className='w-full text-[0.9375rem] dark:bg-[#1E2139] dark:border-[#252945] dark:text-white tracking-[-0.015625rem] font-bold leading-[0.9375rem] pl-[0.625rem] sm:pl-[1.1875rem] pt-[1.0625rem] pb-[0.9375rem] border rounded-[0.25rem]'
        type='text'
        defaultValue={defaultValue || ''}
        onChange={onChange}
      ></input>
      {icon ? icon : null}
    </div>
  )
}
