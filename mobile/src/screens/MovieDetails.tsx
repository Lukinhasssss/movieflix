import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MovieDetails() {
  return (
    <View style={styles.container}>
      <Text>MovieDetails Screen</Text>
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