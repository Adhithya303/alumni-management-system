export const formatDate = (iso) => {
  if (!iso) return '—'
  const date = new Date(iso)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
