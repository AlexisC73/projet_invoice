export const formatDate = (date: string) => {
  const dateObj = new Date(date)
  const monght = dateObj.toLocaleDateString('en-US', {
    month: 'short',
  })
  return `${dateObj.getDate()} ${monght} ${dateObj.getFullYear()}`
}
