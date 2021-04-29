import axios, { AxiosRequestConfig } from 'axios'
import { getSessionData, logout } from './auth'

export type LoginData = {
  username: string
  password: string
}

const BASE_URL = process.env.REACT_APP_BASE_URL ?? 'http://192.168.15.59:8080'

axios.interceptors.response.use(function(response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    logout()
  }

  return Promise.reject(error)
})

export async function makeRequest(params: AxiosRequestConfig) {
  return axios({
    ...params,
    baseURL: BASE_URL
  })
}

export async function makePrivateRequest(params: AxiosRequestConfig) {
  const sessionData = await getSessionData()

  const headers = {
    'Authorization': `Bearer ${sessionData.access_token}`
  }

  return makeRequest({ ...params, headers })
}