// Autenticação: apenas login, sem cadastro.
// O login é validado pelo backend; aqui guardamos apenas o token retornado.

import { apiLogin, getToken, setToken } from './api'

export async function login(usuario, senha) {
  try {
    await apiLogin(usuario, senha)
    return true
  } catch {
    return false
  }
}

export function logout() {
  setToken(null)
}

export function isAuthenticated() {
  return !!getToken()
}
