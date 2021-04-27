import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CreateAccount() {
  return (
    <View style={styles.container}>
      <Text>CreateAccount Screen</Text>
    </View>
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