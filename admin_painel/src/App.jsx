import { Navigate, Route, Routes } from 'react-router-dom'
import { isAuthenticated } from './lib/auth'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import StudentDetail from './pages/StudentDetail'

function Protected({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/alunos" element={<Students />} />
        <Route path="/alunos/:id" element={<StudentDetail />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
