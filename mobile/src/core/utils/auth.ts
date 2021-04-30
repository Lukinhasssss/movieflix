import AsyncStorage from '@react-native-async-storage/async-storage'

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

export type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER'

export async function saveSessionData(loginResponse: LoginResponse) {
  await AsyncStorage.setItem('@movieflix:authData', JSON.stringify(loginResponse))
}

export async function isAuthenticated() {
  try {
    const token = await AsyncStorage.getItem('@movieflix:authData')

    return token ? true : false
  }
  catch (e) {
    console.log(e)
  }
}

export async function logout() {
  try {
    AsyncStorage.removeItem('@movieflix:authData')
  }
  catch (e) {
    console.log(e)
  }
}