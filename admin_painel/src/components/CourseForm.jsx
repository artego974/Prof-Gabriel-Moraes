import { useState } from 'react'
import Modal from './Modal'

export default function CourseForm({ inicial, onSalvar, onFechar }) {
  const [form, setForm] = useState({
    nome: inicial?.nome || '',
    status: inicial?.status || 'comprado',
    valor: inicial?.valor ?? '',
    data: inicial?.data || new Date().toISOString().slice(0, 10),
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
    <Modal titulo={inicial ? 'Editar curso' : 'Adicionar curso'} onFechar={onFechar}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nome do curso <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
            placeholder="Ex.: Matemática Básica"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
            <select
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            >
              <option value="comprado">Comprado</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.valor}
              onChange={(e) => handleChange('valor', e.target.value)}
              placeholder="0,00"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Data da compra</label>
          <input
            type="date"
            value={form.data}
            onChange={(e) => handleChange('data', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>

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
