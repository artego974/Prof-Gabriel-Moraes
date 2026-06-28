export function formatBRL(valor) {
  return (Number(valor) || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso.length === 10 ? iso + 'T00:00:00' : iso)
  return d.toLocaleDateString('pt-BR')
}
