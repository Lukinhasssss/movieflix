import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'
import { encode as btoa } from 'base-64'
import qs from 'qs'

import { makeRequest } from './request'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'movieflix'
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'movieflix123'

type LoginData = {
  username: string
  password: string
}

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

export async function makeLogin(loginData: LoginData) {
  const token = `${CLIENT_ID}:${CLIENT_SECRET}`

  const headers = {
    Authorization: `Basic ${btoa(token)}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  const payload = qs.stringify({ ...loginData, grant_type: 'password' })

  const response = await makeRequest({ url: '/oauth/token', data: payload, method: 'POST', headers })

  saveSessionData(response.data)
}

export function saveSessionData(loginResponse: LoginResponse) {
  AsyncStorage.setItem('@movieflix:access_token', JSON.stringify(loginResponse))
}

export async function getSessionData() { // Recupera os dados da sessão do usuário
  const sessionData = await AsyncStorage.getItem('@movieflix:authData') ?? '{}'
  const parsedSessionData = JSON.parse(sessionData)

  return parsedSessionData as LoginResponse
}

export async function getAccessTokenDecoded() {
  const sessionData = await getSessionData()

  try {
    const tokenDecoded = jwtDecode(sessionData.access_token)
    return tokenDecoded as AccessToken
  } catch (error) {
    return {} as AccessToken
  }
}

export async function isTokenValid() {
  const { exp } = await getAccessTokenDecoded()

  return Date.now() <= exp * 1000
}

export async function isAuthenticated() {
  const sessionData = await getSessionData()

  return sessionData.access_token && isTokenValid()
}

export async function logout() {
  localStorage.removeItem('authData')
  // history.replace('/')
}












// export async function makeLogin(loginData: LoginData) {
//   const token = `${CLIENT_ID}:${CLIENT_SECRET}`

//   const headers = {
//     Authorization: `Basic ${btoa(token)}`,
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }

//   const payload = qs.stringify({ ...loginData, grant_type: 'password' })

//   const response = await makeRequest({ url: '/oauth/token', data: payload, method: 'POST', headers })

//   const { access_token } = response.data
//   saveAsyncStorageData('@movieflix:access_token', access_token)
// }

// async function saveAsyncStorageData(key: string, value: string) {
//   try {
//     await AsyncStorage.setItem(key, value)
//   }
//   catch (e) {
//     console.log(e)
//   }
// }



// type LoginResponse = {
//   access_token: string
//   token_type: string
//   expires_in: number
//   scope: string
//   userName: string
//   userId: number
// }

// type AccessToken = {
//   exp: number // é o tempo de expiração
//   user_name: string
//   authorities: Role[]
// }

// export type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER'

// export const setAsyncStorageData = (loginResponse: LoginResponse) => {
//   Async

//   localStorage.setItem('authData', JSON.stringify(loginResponse)) // JSON.stringify() --> Transforma objeto em string
// }

// export const getAsyncStorageSata = () => { // Recupera os dados da sessão do usuário
//   const sessionData = localStorage.getItem('authData') ?? '{}'
//   const parsedSessionData = JSON.parse(sessionData) // JSON.parse() --> Transforma string em objeto

//   return parsedSessionData as LoginResponse
// }

// export const logout = () => {
//   localStorage.removeItem('authData')
//   history.replace('/')
// }

// export const getAccessTokenDecoded = () => {
//   const sessionData = getSessionData()

//   try {
//     const tokenDecoded = jwtDecode(sessionData.access_token)
//     return tokenDecoded as AccessToken
//   } catch (error) {
//     return {} as AccessToken
//   }
// }

// export const isTokenValid = () => {
//   const { exp } = getAccessTokenDecoded()

//   return Date.now() <= exp * 1000
// }

// export const isAuthenticated = () => {
//   const sessionData = getSessionData()

//   return sessionData.access_token && isTokenValid()
// }

// export const isAllowedByRole = (routeRoles: Role[] = []) => {
//   if (routeRoles.length === 0) {
//     return true
//   }

//   const { authorities } = getAccessTokenDecoded()

//   return routeRoles.some(role => authorities?.includes(role))
// }