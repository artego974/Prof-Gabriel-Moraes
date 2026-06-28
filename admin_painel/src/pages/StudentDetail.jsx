import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  addCourse,
  deleteCourse,
  getStudent,
  updateCourse,
} from '../lib/api'
import { formatBRL, formatDate, professorLabel } from '../lib/format'
import CourseForm from '../components/CourseForm'

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-0.5 text-sm text-gray-900">{value || '—'}</p>
    </div>
  )
}

export default function StudentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [aluno, setAluno] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [formAberto, setFormAberto] = useState(false)
  const [editando, setEditando] = useState(null)

  async function refresh() {
    const a = await getStudent(id)
    setAluno(a)
  }

  useEffect(() => {
    refresh()
      .catch(() => setAluno(null))
      .finally(() => setCarregando(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (carregando) {
    return <p className="text-sm text-gray-500">Carregando...</p>
  }

  if (!aluno) {
    return (
      <div>
        <p className="text-sm text-gray-500">Aluno não encontrado.</p>
        <Link to="/alunos" className="text-sm font-semibold text-accent hover:underline">
          ← Voltar para alunos
        </Link>
      </div>
    )
  }

  function abrirNovo() {
    setEditando(null)
    setFormAberto(true)
  }

  function abrirEdicao(curso) {
    setEditando(curso)
    setFormAberto(true)
  }

  async function salvar(dados) {
    if (editando) {
      await updateCourse(id, editando.id, dados)
    } else {
      await addCourse(id, dados)
    }
    setFormAberto(false)
    setEditando(null)
    await refresh()
  }

  async function remover(curso) {
    if (window.confirm(`Remover o curso "${curso.nome}"?`)) {
      await deleteCourse(id, curso.id)
      await refresh()
    }
  }

  const cursos = aluno.cursos || []
  const totalGasto = cursos.reduce((acc, c) => acc + (Number(c.valor) || 0), 0)

  return (
    <div>
      <button
        onClick={() => navigate('/alunos')}
        className="text-sm font-semibold text-accent hover:underline"
      >
        ← Voltar para alunos
      </button>

      <h1 className="mt-2 text-2xl font-extrabold text-gray-900">{aluno.nome}</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Dados do aluno</h2>
          <div className="space-y-4">
            <InfoRow label="Nome" value={aluno.nome} />
            <InfoRow label="CPF" value={aluno.cpf} />
            <InfoRow label="E-mail" value={aluno.email} />
            <InfoRow label="Telefone" value={aluno.telefone} />
            <InfoRow label="Endereço" value={aluno.endereco} />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Cursos</h2>
              <p className="text-sm text-gray-500">
                {cursos.length} curso(s) — Total: {formatBRL(totalGasto)}
              </p>
            </div>
            <button
              onClick={abrirNovo}
              className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
              + Curso
            </button>
          </div>

          {cursos.length === 0 ? (
            <p className="text-sm text-gray-500">
              Nenhum curso registrado para este aluno.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="py-2 font-semibold">Curso</th>
                  <th className="py-2 font-semibold">Professor</th>
                  <th className="py-2 font-semibold">Status</th>
                  <th className="py-2 font-semibold">Valor</th>
                  <th className="py-2 font-semibold">Data</th>
                  <th className="py-2 text-right font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cursos.map((c) => (
                  <tr key={c.id}>
                    <td className="py-3 font-medium text-gray-900">{c.nome}</td>
                    <td className="py-3 text-gray-600">{professorLabel(c.professor)}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          c.status === 'concluido'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {c.status === 'concluido' ? 'Concluído' : 'Comprado'}
                      </span>
                    </td>
                    <td className="py-3 text-gray-600">{formatBRL(c.valor)}</td>
                    <td className="py-3 text-gray-600">{formatDate(c.data)}</td>
                    <td className="py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => abrirEdicao(c)}
                          className="rounded-md px-2 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => remover(c)}
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
      </div>

      {formAberto && (
        <CourseForm
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
