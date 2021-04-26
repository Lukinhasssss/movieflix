import history from "./history"
import jwtDecode from "jwt-decode"

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'movieflix'
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'movieflix123'

type LoginResponse = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  userName: string
  userId: number
}

type AccessToken = {
  exp: number // é o tempo de expiração
  user_name: string
  authorities: Role[]
}

export type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER'

export const saveSessionData = (loginResponse: LoginResponse) => {
  localStorage.setItem('authData', JSON.stringify(loginResponse)) // JSON.stringify() --> Transforma objeto em string
}

export const getSessionData = () => { // Recupera os dados da sessão do usuário
  const sessionData = localStorage.getItem('authData') ?? '{}'
  const parsedSessionData = JSON.parse(sessionData) // JSON.parse() --> Transforma string em objeto

  return parsedSessionData as LoginResponse
}

export const logout = () => {
  localStorage.removeItem('authData')
  history.replace('/')
}

export const getAccessTokenDecoded = () => {
  const sessionData = getSessionData()

  try {
    const tokenDecoded = jwtDecode(sessionData.access_token)
    return tokenDecoded as AccessToken
  } catch (error) {
    return {} as AccessToken
  }
}

export const isTokenValid = () => {
  const { exp } = getAccessTokenDecoded()

  return Date.now() <= exp * 1000
}

export const isAuthenticated = () => {
  const sessionData = getSessionData()

  return sessionData.access_token && isTokenValid()
}

export const isAllowedByRole = (routeRoles: Role[] = []) => {
  if (routeRoles.length === 0) {
    return true
  }

  const { authorities } = getAccessTokenDecoded()

  return routeRoles.some(role => authorities?.includes(role))
}