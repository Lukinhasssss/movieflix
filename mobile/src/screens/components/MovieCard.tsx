import React from "react";
import { useNavigation } from "@react-navigation/core";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { Movie } from "../../core/types/Movie";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

type Props = {
  movie: Movie
  movieId: number
}

export default function MovieCard({ movie, movieId }: Props) {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: movie.imgUrl }}
        style={ styles.image }
      />

      <View style={ styles.infosContainer }>
        <Text style={ styles.title }>
          { movie.title }
        </Text>

        <Text style={ styles.year }>
          { movie.year }
        </Text>

        <Text style={ styles.subtitle }>
          { movie.subTitle }
        </Text>

        <View style={ styles.buttonWrapper }>
          <TouchableOpacity
            style={ styles.buttonContainer }
            activeOpacity={ 0.5 }
            onPress={ () =>  navigation.navigate('MovieDetails', { movieId }) }
          >
            <Text style={ styles.buttonText }>
              Ver detalhes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 420,
    backgroundColor: colors.mediumGray,
    borderRadius: 10,
    marginVertical: 20
  },

  image: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },

  infosContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flex: 1,
    height: '100%'
  },

  title: {
    fontFamily: fonts.title,
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: -0.015,
    color: colors.white
  },

  year: {
    fontFamily: fonts.title,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.015,
    color: colors.yellow
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.015,
    color: colors.subtitleLight,
    marginVertical: 10
  },

  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    height: 40,
    borderWidth: 1,
    borderColor: colors.whiteBorder,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    fontFamily: fonts.title,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.015,
    color: colors.white,
    textTransform: 'uppercase'
  }
})