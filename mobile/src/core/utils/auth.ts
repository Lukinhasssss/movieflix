import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'movieflix'
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'movieflix123'

type AccessToken = {
  exp: number // é o tempo de expiração
  user_name: string
  authorities: Role[]
}

export type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER'

export async function isAuthenticated() {
  try {
    const token = await AsyncStorage.getItem('@movieflix:accessToken')

    return token ? true : false
  }
  catch (e) {
    console.log(e)
  }
}

export async function logout() {
  try {
    AsyncStorage.removeItem('@movieflix:accessToken')
  }
  catch (e) {
    console.log(e)
  }
}

async function getAcessTokenDecoded() {
  const accessToken = await AsyncStorage.getItem('@movieflix:accessToken') ?? ''

  try {
    const accessTokenDecoded = jwtDecode(accessToken)
    return accessTokenDecoded as AccessToken
  }
  catch (e) {
    return {} as AccessToken
  }
}

export async function isUserMember() {
  const { authorities } = await getAcessTokenDecoded()

  return authorities.toString() === 'ROLE_MEMBER'
}