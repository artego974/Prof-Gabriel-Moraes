import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../lib/auth'

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
          isActive
            ? 'bg-accent text-white shadow'
            : 'text-gray-300 hover:bg-white/10 hover:text-white'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default function Layout() {
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 flex-col bg-gray-900 p-4">
        <div className="mb-8 px-2">
          <p className="text-lg font-extrabold text-white">Painel Admin</p>
          <p className="text-xs text-gray-400">Prof. Gabriel Moraes</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          <NavItem to="/">Dashboard</NavItem>
          <NavItem to="/alunos">Alunos</NavItem>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-4 rounded-lg px-4 py-2.5 text-left text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
        >
          Sair
        </button>
      </aside>

      <main className="flex-1 overflow-x-hidden p-8">
        <Outlet />
      </main>
    </div>
  )
}
