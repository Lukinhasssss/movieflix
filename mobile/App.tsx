import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useFonts, OpenSans_400Regular, OpenSans_700Bold } from '@expo-google-fonts/open-sans'
import AppLoading from 'expo-app-loading'

import Routes from './src/routes';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold
  })

  if(!fontsLoaded)
    return <AppLoading /> // Segura o app na splash screen até as fonts carregarem

  return (
    <NavigationContainer>
      <Routes />
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
