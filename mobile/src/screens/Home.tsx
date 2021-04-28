import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

import mainImage from '../core/assets/main-image.png'
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/core";

export default function Home() {
  const navigation = useNavigation()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={ mainImage } style={ styles.image } />

      <Text style={ styles.title }>
        Avalie filmes
      </Text>

      <Text style={ styles.subtitle }>
        Diga o que achou do seu {'\n'} filme favorito
      </Text>

      <TouchableOpacity
        style={ styles.buttonContainer }
        activeOpacity={ 0.8 }
        onPress={ () => navigation.navigate('Login') }
      >
        <Text style={ styles.buttonText }>
          Fazer Login
        </Text>

        <View style={ styles.buttonImageContainer }>
          <Feather
            name='chevron-right'
            style={ styles.buttonImage }
          />
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.darkGray,
    alignItems: 'center',
    paddingVertical: 70,
    paddingHorizontal: 40
  },

  image: {
    width: '100%',
    resizeMode: 'contain'
  },

  title: {
    fontFamily: fonts.title,
    fontSize: 26,
    lineHeight: 35,
    letterSpacing: -0.015,
    color: colors.white,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 30
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.015,
    color: colors.subtitle,
    marginBottom: 50
  },

  buttonContainer: {
    width: '100%',
    maxWidth: 330,
    height: 50,
    backgroundColor: colors.yellow,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  buttonText: {
    flex: 1,
    fontFamily: fonts.title,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    color: colors.black,
    textTransform: 'uppercase'
  },

  buttonImageContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonImageContainer,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10
  },

  buttonImage: {
    fontSize: 28,
    color: colors.white
  }
})