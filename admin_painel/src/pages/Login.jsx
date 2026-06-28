import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated, login } from '../lib/auth'

export default function Login() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) navigate('/', { replace: true })
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    const ok = await login(usuario, senha)
    setCarregando(false)
    if (ok) {
      navigate('/', { replace: true })
    } else {
      setErro('Usuário ou senha incorretos.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-accent-dark p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900">Painel Admin</h1>
          <p className="mt-1 text-sm text-gray-500">Prof. Gabriel Moraes</p>
        </div>

        {erro && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
            {erro}
          </div>
        )}

        <label className="mb-1 block text-sm font-medium text-gray-700">Usuário</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          autoFocus
          className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />

        <label className="mb-1 block text-sm font-medium text-gray-700">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="mb-6 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />

        <button
          type="submit"
          disabled={carregando}
          className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60"
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
