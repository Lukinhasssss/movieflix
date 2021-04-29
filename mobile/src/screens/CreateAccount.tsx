import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Alert } from "react-native";

import Button from "../core/components/Button";
import { makeLogin, makeRequest } from "../core/utils/request";
import { AuthContext } from "../contexts/AuthContext";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import eyesClosed from '../core/assets/eyes-closed.png'
import eyesOpened from '../core/assets/eyes-opened.png'

export default function CreateAccount() {
  const { setUserLogged } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)

  async function handleCreateAccount() {
    try {
      const payload = {
        name,
        email,
        password,
        roles: [{
          id: 2
        }]
      }
      await makeRequest({
        url: '/users',
        method: 'POST',
        data: payload
      })

      Alert.alert('Cadastrar', 'Conta criada com sucesso!🥳', [
        { text: 'OK', onPress: async () => {
          const loginData = { username: email, password }
          await makeLogin(loginData)
          setUserLogged()
        }}
      ])
    }
    catch (e) {
      Alert.alert('Ocorreu um erro! 😢')
    }
  }

  return (
    <ScrollView contentContainerStyle={ styles.container }>
      <Text style={ styles.title }>Criar Conta</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor={ colors.placeholder }
        autoCapitalize="words"
        keyboardType="email-address"
        value={ name }
        onChangeText={ event => setName(event) }
        style={ styles.textInput }
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor={ colors.placeholder }
        autoCapitalize="none"
        keyboardType="email-address"
        value={ email }
        onChangeText={ event => setEmail(event) }
        style={[styles.textInput, styles.mt30]}
      />

      <View style={ styles.passwordGroup }>
        <TextInput
          placeholder="Senha"
          placeholderTextColor={ colors.placeholder }
          autoCapitalize="none"
          secureTextEntry={ hidePassword }
          value={ password }
          onChangeText={ event => setPassword(event) }
          style={ styles.textInput }
        />
        <TouchableOpacity
          onPress={ () => setHidePassword(!hidePassword) }
          style={ styles.toggle }
        >
          <Image source={ hidePassword ? eyesOpened : eyesClosed } />
        </TouchableOpacity>
      </View>

      <Button
        title='Cadastrar'
        onPress={ () => handleCreateAccount() }
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: colors.darkGray,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 70,
    // paddingBottom: 30,
    paddingHorizontal: 40
  },

  title: {
    fontFamily: fonts.text,
    fontSize: 30,
    lineHeight: 41,
    letterSpacing: -0.015,
    color: colors.white,
    marginBottom: 70,
    textAlign: 'center'
  },

  form: {
    marginVertical: 10
  },

  textInput: {
    width: '100%',
    maxWidth: 400,
    height: 50,
    backgroundColor: colors.whiteBackground,
    borderWidth: 1,
    borderColor: colors.whiteBorder,
    borderRadius: 10,
    padding: 10
  },

  mt30: {
    marginTop: 30
  },

  passwordGroup: {
    width: '100%',
    maxWidth: 335,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 70
  },

  toggle: {
    margin: -40
  }
})