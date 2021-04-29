import React, { useState } from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans'
import AppLoading from 'expo-app-loading'

import Routes from './src/routes';
import { AuthContext } from './src/contexts/AuthContext';
import { isAuthenticated } from './src/core/utils/auth';

export default function App() {
  const [isUserLogged, setIsUserLogged] = useState(setUserLogged() ? true : false)

  async function setUserLogged() {
    const user = await isAuthenticated()
    if (user) {
      setIsUserLogged(true)
    } else {
      setIsUserLogged(false)
    }
  }

  const [ fontsLoaded ] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold
  })

  if(!fontsLoaded)
    return <AppLoading /> // Segura o app na splash screen até as fonts carregarem

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ isUserLogged, setUserLogged }}>
        <Routes />
      </AuthContext.Provider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
