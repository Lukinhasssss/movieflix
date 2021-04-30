import AsyncStorage from '@react-native-async-storage/async-storage'
// import jwtDecode from 'jwt-decode'

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

// type AccessToken = {
//   exp: number // é o tempo de expiração
//   user_name: string
//   authorities: Role[]
// }

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

// export async function getSessionData() { // Recupera os dados da sessão do usuário
//   const sessionData = await AsyncStorage.getItem('@movieflix:authData') ?? '{}'
//   const parsedSessionData = JSON.parse(sessionData)

//   return parsedSessionData as LoginResponse
// }

// export async function getAccessTokenDecoded() {
//   const sessionData = await getSessionData()

//   try {
//     const tokenDecoded = jwtDecode(sessionData.access_token)
//     return tokenDecoded as AccessToken
//   } catch (error) {
//     return {} as AccessToken
//   }
// }

// export async function isTokenValid() {
//   const { exp } = await getAccessTokenDecoded()

//   return Date.now() <= exp * 1000
// }