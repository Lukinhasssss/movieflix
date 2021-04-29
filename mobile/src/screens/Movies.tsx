import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import colors from "../styles/colors";
import MovieCard from "./components/MovieCard";

export default function Movies() {
  return (
    <ScrollView style={ styles.container }>
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.darkGray,
    padding: 20,
  },
})