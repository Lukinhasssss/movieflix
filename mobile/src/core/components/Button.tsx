import React from "react"
import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native"
import colors from "../../styles/colors"
import fonts from "../../styles/fonts"

interface Props extends TouchableOpacityProps {
  title: string,
  children?: React.ReactNode
}

export default function Button({ title, children, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={ styles.buttonContainer }
      activeOpacity={ 0.8 }
      { ...rest }
    >
      <Text style={ styles.buttonText }>
        { title }
      </Text>

      { children }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
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
})