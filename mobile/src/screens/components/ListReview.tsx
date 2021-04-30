import React from 'react'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, Text, View } from "react-native"

import { Review } from "../../core/types/Movie"
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

type Props = {
  review: Review
}

export default function ListReview({ review }: Props) {
  return (
    <>
      <View style={ styles.reviewNameContainer }>
        <Feather
          name="star"
          color={ colors.yellow }
        />
        <Text style={ styles.reviewName }>
          { review.user.name }
        </Text>
      </View>

      <View style={ styles.reviewTextContainer }>
        <Text style={ styles.reviewText }>
          { review.text }
        </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  reviewNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 20
  },

  reviewName: {
    fontFamily: fonts.title,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.015,
    color: colors.white,
    marginLeft: 12
  },

  reviewTextContainer: {
    borderWidth: 1,
    borderColor: colors.whiteBorder,
    borderRadius: 20,
    padding: 10,
    marginTop: 7
  },

  reviewText: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
    letterSpacing: -0.015,
    color: colors.lightGray
  }
})