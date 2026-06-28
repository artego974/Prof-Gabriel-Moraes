import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStats, getStudents } from '../lib/api'
import { formatBRL, professorLabel } from '../lib/format'

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className={`mt-2 text-3xl font-extrabold ${accent}`}>{value}</p>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [recentes, setRecentes] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    Promise.all([getStats(), getStudents()])
      .then(([s, alunos]) => {
        setStats(s)
        setRecentes(
          [...alunos]
            .sort((a, b) => (a.criado_em < b.criado_em ? 1 : -1))
            .slice(0, 5),
        )
      })
      .catch(() => {})
      .finally(() => setCarregando(false))
  }, [])

  if (carregando) {
    return <p className="text-sm text-gray-500">Carregando...</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">Visão geral dos alunos e cursos.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Alunos" value={stats?.totalAlunos ?? 0} accent="text-accent" />
        <StatCard label="Cursos vendidos" value={stats?.totalCursos ?? 0} accent="text-gray-900" />
        <StatCard label="Cursos concluídos" value={stats?.concluidos ?? 0} accent="text-green-600" />
        <StatCard label="Receita total" value={formatBRL(stats?.receita)} accent="text-secondary" />
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Receita por professor</h2>
        <p className="mt-1 text-sm text-gray-500">
          Total arrecadado com os cursos de cada professor.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(stats?.porProfessor ?? []).map((p) => (
            <div
              key={p.professor}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-5"
            >
              <div>
                <p className="font-semibold text-gray-900">{professorLabel(p.professor)}</p>
                <p className="text-sm text-gray-500">
                  {p.aulas} aula(s)
                  {p.pacotes > 0 && ` + ${p.pacotes} pacote(s)`}
                </p>
              </div>
              <p className="text-2xl font-extrabold text-secondary">{formatBRL(p.receita)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Alunos recentes</h2>
          <Link to="/alunos" className="text-sm font-semibold text-accent hover:underline">
            Ver todos
          </Link>
        </div>

        {recentes.length === 0 ? (
          <p className="text-sm text-gray-500">
            Nenhum aluno cadastrado ainda.{' '}
            <Link to="/alunos" className="font-semibold text-accent hover:underline">
              Cadastrar agora
            </Link>
            .
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentes.map((a) => (
              <li key={a.id}>
                <Link
                  to={`/alunos/${a.id}`}
                  className="flex items-center justify-between py-3 transition hover:opacity-70"
                >
                  <div>
                    <p className="font-medium text-gray-900">{a.nome}</p>
                    <p className="text-sm text-gray-500">{a.email || a.cpf || '—'}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {a.total_cursos ?? 0} curso(s)
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
