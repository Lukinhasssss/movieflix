import React from 'react'
import { StyleSheet, Text } from "react-native";

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function HeaderLeft() {
  return (
    <Text
      style={ styles.headerLeft }
    >
      MovieFlix
    </Text>
  )
}

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 45,
    marginVertical: 15,
    fontFamily: fonts.title,
    fontSize: 18,
    letterSpacing: -0.015,
    color: colors.black
  }
})