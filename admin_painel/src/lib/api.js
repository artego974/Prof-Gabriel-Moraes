// Cliente HTTP para o backend. Guarda o token de login e o envia em cada chamada.

const TOKEN_KEY = 'admin_painel:token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...(options.headers || {}),
    },
  })

  if (res.status === 401) {
    setToken(null)
    // recarrega para voltar à tela de login
    if (!path.startsWith('/login')) window.location.href = '/login'
    throw new Error('Não autorizado')
  }

  const dados = res.status === 204 ? null : await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(dados?.erro || 'Erro na requisição')
  }
  return dados
}

// --- Autenticação ---
export async function apiLogin(usuario, senha) {
  const { token } = await request('/login', {
    method: 'POST',
    body: JSON.stringify({ usuario, senha }),
  })
  setToken(token)
  return token
}

// --- Estatísticas ---
export const getStats = () => request('/stats')

// --- Alunos ---
export const getStudents = () => request('/alunos')
export const getStudent = (id) => request(`/alunos/${id}`)
export const createStudent = (dados) =>
  request('/alunos', { method: 'POST', body: JSON.stringify(dados) })
export const updateStudent = (id, dados) =>
  request(`/alunos/${id}`, { method: 'PUT', body: JSON.stringify(dados) })
export const deleteStudent = (id) => request(`/alunos/${id}`, { method: 'DELETE' })

// --- Cursos ---
export const addCourse = (studentId, dados) =>
  request(`/alunos/${studentId}/cursos`, { method: 'POST', body: JSON.stringify(dados) })
export const updateCourse = (studentId, courseId, dados) =>
  request(`/alunos/${studentId}/cursos/${courseId}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  })
export const deleteCourse = (studentId, courseId) =>
  request(`/alunos/${studentId}/cursos/${courseId}`, { method: 'DELETE' })
