import React, { useContext } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthContext } from '../../contexts/AuthContext';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { logout } from '../utils/auth';

export default function HeaderRight() {
  const { setUserLogged } = useContext(AuthContext)

  async function handleLogout() {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Não 🙏', style: 'cancel' },
      { text: 'Sim 😢', onPress: async () => {
        try {
          await logout()
          setUserLogged()
        }
        catch (error) {
          Alert.alert('Ocorreu um erro! 😢')
        }
      }}
    ])
  }

  return (
    <TouchableOpacity
      style={ styles.buttonContainer }
      onPress={ () => handleLogout() }
    >
      <Text style={ styles.buttonText }>
        Sair
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 75,
    height: 26,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },

  buttonText: {
    fontFamily: fonts.title,
    fontSize: 14,
    color: colors.black,
    textTransform: 'uppercase'
  }
})