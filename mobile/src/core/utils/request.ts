import axios, { AxiosRequestConfig } from 'axios'
import { encode as btoa } from 'base-64'
import qs from 'qs'

import { CLIENT_ID, CLIENT_SECRET, logout, saveSessionData } from './auth'

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