import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

import { Movie } from "../core/types/Movie";
import { makePrivateRequest } from "../core/utils/request";
import ListReview from "./components/ListReview";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function MovieDetails({ route: { params: {movieId} } }) {
  const [movie, setMovie] = useState<Movie>()

  async function getMovie() {
    const response = await makePrivateRequest({ url: `/movies/${movieId}` })
    setMovie(response.data)
  }

  useEffect(() => {
    getMovie()
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={ styles.cardContainer }>
        <Image
          source={{ uri: movie?.imgUrl }}
          style={ styles.movieImage }
        />

        <View style={ styles.movieInfoContainer }>
          <Text style={ styles.movieTitle }>
            { movie?.title }
          </Text>

          <Text style={ styles.movieYear }>
            { movie?.year }
          </Text>

          <Text style={ styles.movieSubtitle }>
            { movie?.subTitle }
          </Text>

          <Text style={ styles.movieSynopseText }>
            Sinopse
          </Text>

          <ScrollView
            style={ styles.movieSynopseContainer }
            showsVerticalScrollIndicator={ false }
            persistentScrollbar={true}
          >
            <Text style={ styles.movieSynopse }>
              { movie?.synopsis }
            </Text>
          </ScrollView>
        </View>
      </View>

      {movie?.reviews.length !== 0 && (
        <ScrollView style={ styles.reviewContainer }>
          <Text style={ styles.reviewContainerTitle }>Avaliações</Text>

          {movie?.reviews.map(review => (
            <ListReview key={ review.id } review={ review } />
          ))}
        </ScrollView>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.darkGray,
    paddingTop: 20,
    paddingHorizontal: 20
  },

  cardContainer: {
    width: '100%',
    backgroundColor: colors.mediumGray,
    borderRadius: 20,
    marginBottom: 20
  },

  movieImage: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover',
  },

  movieInfoContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15
  },

  movieTitle: {
    fontFamily: fonts.title,
    fontSize: 24,
    lineHeight: 33,
    letterSpacing: -0.015,
    color: colors.white
  },

  movieYear: {
    fontFamily: fonts.title,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.015,
    color: colors.yellow
  },

  movieSubtitle: {
    fontFamily: fonts.text,
    fontSize: 18,
    lineHeight: 23,
    letterSpacing: -0.015,
    color: colors.lightGray,
    marginVertical: 10
  },

  movieSynopseText: {
    fontFamily: fonts.title,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.015,
    color: colors.white,
    marginTop: 10
  },

  movieSynopseContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: colors.whiteBorder,
    borderRadius: 20,
    marginTop: 10,
    paddingHorizontal: 15
  },

  movieSynopse: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
    letterSpacing: -0.015,
    color: colors.lightGray,
    marginTop: 15,
    marginVertical: 15
  },

  reviewContainer: {
    backgroundColor: colors.mediumGray,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  reviewContainerTitle: {
    fontFamily: fonts.title,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.015,
    color: colors.white
  }
})