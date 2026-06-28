import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from '../lib/api'
import StudentForm from '../components/StudentForm'

export default function Students() {
  const [students, setStudents] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [busca, setBusca] = useState('')
  const [formAberto, setFormAberto] = useState(false)
  const [editando, setEditando] = useState(null)

  async function refresh() {
    const lista = await getStudents()
    setStudents(lista)
  }

  useEffect(() => {
    refresh()
      .catch(() => {})
      .finally(() => setCarregando(false))
  }, [])

  function abrirNovo() {
    setEditando(null)
    setFormAberto(true)
  }

  function abrirEdicao(aluno) {
    setEditando(aluno)
    setFormAberto(true)
  }

  async function salvar(dados) {
    if (editando) {
      await updateStudent(editando.id, dados)
    } else {
      await createStudent(dados)
    }
    setFormAberto(false)
    setEditando(null)
    await refresh()
  }

  async function remover(aluno) {
    if (
      window.confirm(
        `Excluir o aluno "${aluno.nome}" e todos os seus cursos? Esta ação não pode ser desfeita.`,
      )
    ) {
      await deleteStudent(aluno.id)
      await refresh()
    }
  }

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    if (!q) return students
    return students.filter((a) =>
      [a.nome, a.cpf, a.email, a.telefone].some((c) =>
        (c || '').toLowerCase().includes(q),
      ),
    )
  }, [students, busca])

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Alunos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Cadastro de alunos e seus cursos.
          </p>
        </div>
        <button
          onClick={abrirNovo}
          className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
        >
          + Novo aluno
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nome, CPF, e-mail ou telefone..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="mt-6 w-full max-w-md rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
      />

      <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm">
        {carregando ? (
          <p className="p-6 text-sm text-gray-500">Carregando...</p>
        ) : filtrados.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            {students.length === 0
              ? 'Nenhum aluno cadastrado. Clique em "Novo aluno" para começar.'
              : 'Nenhum aluno encontrado para a busca.'}
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Nome</th>
                <th className="px-4 py-3 font-semibold">CPF</th>
                <th className="px-4 py-3 font-semibold">E-mail</th>
                <th className="px-4 py-3 font-semibold">Telefone</th>
                <th className="px-4 py-3 text-center font-semibold">Cursos</th>
                <th className="px-4 py-3 text-right font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtrados.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      to={`/alunos/${a.id}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {a.nome || '—'}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{a.cpf || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{a.email || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{a.telefone || '—'}</td>
                  <td className="px-4 py-3 text-center text-gray-600">
                    {a.total_cursos ?? 0}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => abrirEdicao(a)}
                        className="rounded-md px-2 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => remover(a)}
                        className="rounded-md px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {formAberto && (
        <StudentForm
          inicial={editando}
          onSalvar={salvar}
          onFechar={() => {
            setFormAberto(false)
            setEditando(null)
          }}
        />
      )}
    </div>
  )
}
