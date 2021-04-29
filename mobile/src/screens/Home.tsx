import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/core";

import Button from "../core/components/Button";

import mainImage from '../core/assets/main-image.png'
import colors from "../styles/colors";
import fonts from "../styles/fonts";

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

      <Button
        title='Fazer Login'
        onPress={ () => navigation.navigate('Login') }
      >
        <View style={ styles.buttonImageContainer }>
          <Feather
            name='chevron-right'
            style={ styles.buttonImage }
          />
        </View>
      </Button>
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