import React from 'react'
import { StyleSheet, View } from "react-native";
import { Feather } from '@expo/vector-icons';

import colors from '../../styles/colors';

export default function HeaderBackImage() {
  return (
    <View style={ styles.headerBackImageContainer }>
      <Feather
        name='chevron-left'
        style={ styles.headerBackImage }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerBackImageContainer: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.black,
    marginRight: -30
  },

  headerBackImage: {
    color: colors.yellow,
    fontSize: 18
  }
})