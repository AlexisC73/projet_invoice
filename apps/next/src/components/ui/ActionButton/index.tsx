export default function ActionButton({
  action,
  style,
  type = 'button',
  clickAction,
}: {
  action: string
  style: 'primary' | 'secondary' | 'black' | 'white' | 'default'
  type?: 'button' | 'submit'
  clickAction?: (e: any) => void
}) {
  const tint =
    style === 'primary'
      ? 'bg-[#7C5DFA] text-white'
      : style === 'secondary'
      ? 'bg-[#ec5757] text-white'
      : style === 'black'
      ? 'bg-[#373B53] text-[#888EB0] dark:bg-[#373B53] dark:text-[#DFE3FA]'
      : style === 'white'
      ? 'bg-[#F9FAFE] text-[#7E88C3]'
      : 'bg-[#f9fafe] text-[#7E88C3] dark:text-white dark:bg-[#252945]'
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
