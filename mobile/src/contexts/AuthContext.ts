import { createContext } from "react"

type AuthContextData = {
  isUserLogged: boolean
  setUserLogged: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextData)