export default function ActionButton({
  action,
  style,
  type = 'button',
  clickAction,
}: {
  action: string
  style: 'primary' | 'secondary' | 'default'
  type?: 'button' | 'submit'
  clickAction?: (e: any) => void
}) {
  const tint =
    style === 'primary'
      ? 'bg-[#7C5DFA] text-white'
      : style === 'secondary'
      ? 'bg-[#ec5757] text-white'
      : 'bg-[#f9fafe] text-[#7E88C3]'
  return (
    <button
      type={type}
      onClick={clickAction}
      className={
        `text-[0.9375rem] tracking-[-0.015625] font-bold px-6 h-12 rounded-3xl ` +
        tint
      }
    >
      {action.charAt(0).toUpperCase() + action.slice(1)}
    </button>
  )
}
