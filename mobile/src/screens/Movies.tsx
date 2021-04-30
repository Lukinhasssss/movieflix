import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, FlatList, View } from "react-native";

import { Movie, MovieResponse } from "../core/types/Movie";
import MovieCard from "./components/MovieCard";

import colors from "../styles/colors";
import { makePrivateRequest } from "../core/utils/request";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>()

  async function getMovies() {
    const response = await makePrivateRequest({ url: '/movies'})
    const movies = response.data
    setMovies(movies)
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <View style={ styles.container }>
      <FlatList
        data={ movies }
        keyExtractor={ item => String(item.id) }
        renderItem={({ item }) => (
          <MovieCard
            key={ item.id }
            movie={ item }
          />
        )}
        showsVerticalScrollIndicator={ false }
        numColumns={ 1 }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.darkGray,
    padding: 20,
  },
})