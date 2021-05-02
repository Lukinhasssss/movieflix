import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function HeaderLeft() {
  const navigation = useNavigation()

  return (
    <View style={ styles.headerLeftContainer }>
      {navigation.canGoBack() && (
        <TouchableOpacity
          activeOpacity={ 0.3 }
          style={ styles.headerBackImageContainer }
          onPress={ () => navigation.goBack() }
        >
          <Feather
            name='chevron-left'
            style={ styles.headerBackImage }
          />
        </TouchableOpacity>
      )}

      <Text
        style={ navigation.canGoBack() ? styles.headerLeftTextWithoutImage : styles.headerLeftText }
      >
        MovieFlix
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerBackImageContainer: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.black,
    marginLeft: 20
  },

  headerBackImage: {
    color: colors.yellow,
    fontSize: 18
  },

  headerLeftText: {
    marginLeft: 45,
    marginVertical: 15,
    fontFamily: fonts.title,
    fontSize: 18,
    letterSpacing: -0.015,
    color: colors.black
  },

  headerLeftTextWithoutImage: {
    marginLeft: 15,
    marginVertical: 15,
    fontFamily: fonts.title,
    fontSize: 18,
    letterSpacing: -0.015,
    color: colors.black
  }
})