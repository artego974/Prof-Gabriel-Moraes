import { useState } from 'react'
import Modal from './Modal'

const campos = [
  { key: 'nome', label: 'Nome', placeholder: 'Nome completo', required: true },
  { key: 'cpf', label: 'CPF', placeholder: '000.000.000-00' },
  { key: 'email', label: 'E-mail', placeholder: 'email@exemplo.com', type: 'email' },
  { key: 'telefone', label: 'Telefone', placeholder: '(00) 00000-0000' },
  { key: 'endereco', label: 'Endereço', placeholder: 'Rua, número, bairro, cidade' },
]

export default function StudentForm({ inicial, onSalvar, onFechar }) {
  const [form, setForm] = useState({
    nome: inicial?.nome || '',
    cpf: inicial?.cpf || '',
    email: inicial?.email || '',
    telefone: inicial?.telefone || '',
    endereco: inicial?.endereco || '',
  })

  function handleChange(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.nome.trim()) return
    onSalvar(form)
  }

  return (
    <Modal titulo={inicial ? 'Editar aluno' : 'Novo aluno'} onFechar={onFechar}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {campos.map((c) => (
          <div key={c.key}>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {c.label}
              {c.required && <span className="text-red-500"> *</span>}
            </label>
            <input
              type={c.type || 'text'}
              value={form[c.key]}
              onChange={(e) => handleChange(c.key, e.target.value)}
              placeholder={c.placeholder}
              required={c.required}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
        ))}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onFechar}
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  )
}
