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

// Professores do painel (valor interno -> nome exibido e preço por aula).
// Prof. Gabriel Moraes (programação) cobra R$ 100/aula; Prof. Arthur Mattjie
// (desenvolvimento web) cobra R$ 55/aula.
export const PROFESSORES = [
  { valor: 'gabriel', nome: 'Prof. Gabriel Moraes', valorAula: 100 },
  { valor: 'arthur', nome: 'Prof. Arthur Mattjie', valorAula: 55 },
]

export function professorLabel(valor) {
  return PROFESSORES.find((p) => p.valor === valor)?.nome || 'Prof. Gabriel Moraes'
}

export function professorValorAula(valor) {
  return PROFESSORES.find((p) => p.valor === valor)?.valorAula ?? 100
}
