import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";

import { Movie } from "../core/types/Movie";
import MovieCard from "./components/MovieCard";

import colors from "../styles/colors";
import { makePrivateRequest } from "../core/utils/request";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>()
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  async function getMovies() {
    const params = {
      linesPerPage: 6,
      page
    }

    const response = await makePrivateRequest({ url: '/movies', params})
    const { content } = response.data

    if (!response)
      setIsLoading(true)

    if (page > 0) {
      setMovies(oldValue => [...oldValue, ...content])
    } else {
      setMovies(content)
    }

    setIsLoading(false)
    setIsLoadingMore(false)
  }

  function loadMore(distance: number) {
    if (distance < 1)
      return

    setIsLoadingMore(true)
    setPage(oldValue => oldValue + 1)
    getMovies()
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <View style={ styles.container }>
      {isLoading ? (
        <ActivityIndicator color={ colors.whiteBorder } size='large' />
      ) : (
        <FlatList
          data={ movies }
          keyExtractor={ item => String(item.id) }
          renderItem={({ item }) => (
            <MovieCard
              key={ item.id }
              movieId={ item.id }
              movie={ item }
            />
          )}
          numColumns={ 1 }
          showsVerticalScrollIndicator={ false }
          onEndReachedThreshold={ 0.1 } // 0.1 --> Quando o usuário chegar a 10% do final da tela
          onEndReached={({ distanceFromEnd }) => loadMore(distanceFromEnd)}
          ListFooterComponent={ isLoadingMore ? <ActivityIndicator color={ colors.yellow } size='large' /> : <></> }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.darkGray,
    paddingHorizontal: 20
  },
})