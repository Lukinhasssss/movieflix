import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";

import { Genre, Movie } from "../core/types/Movie";
import MovieCard from "./components/MovieCard";

import colors from "../styles/colors";
import { makePrivateRequest } from "../core/utils/request";
import Filter from "./components/Filter";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>()
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [genre, setGenre] = useState<Genre>()

  async function getMovies() {
    const params = {
      linesPerPage: 6,
      page,
      genreId: genre?.id
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

  function handleChangeGenre(genre: Genre) {
    setPage(0)
    setGenre(genre)
  }

  useEffect(() => {
    getMovies()
  }, [genre?.id])

  return (
    <View style={ styles.container }>
      {isLoading ? (
        <ActivityIndicator color={ colors.whiteBorder } size='large' />
      ) : (
        <>
          <Filter
            genre={ genre }
            handleChangeGenre={ handleChangeGenre }
          />

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
            ListFooterComponent={ isLoadingMore ? <ActivityIndicator style={{marginBottom: 20}} color={ colors.yellow } /> : <></> }
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: colors.darkGray,
    paddingHorizontal: 20,
    paddingTop: 20
  },
})