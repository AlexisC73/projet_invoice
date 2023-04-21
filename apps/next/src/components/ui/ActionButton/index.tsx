export default function ActionButton({ action }: { action: string }) {
  const tint =
    action.toLowerCase() === 'mark as paid'
      ? 'bg-[#7C5DFA] text-white'
      : action.toLowerCase() === 'delete'
      ? 'bg-[#ec5757] text-white'
      : 'bg-[#f9fafe] text-[#7E88C3]'
  return (
    <button
      className={
        `text-[0.9375rem] tracking-[-0.015625] font-bold px-6 h-12 rounded-3xl ` +
        tint
      }
    >
      {action.charAt(0).toUpperCase() + action.slice(1)}
    </button>
  )
}
