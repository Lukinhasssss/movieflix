import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, TextInput, View } from 'react-native'
import Button from '../../core/components/Button'
import { isUserMember } from '../../core/utils/auth'
import { makePrivateRequest } from '../../core/utils/request'
import colors from '../../styles/colors'

type Props = {
  movieId: any
}

export default function SaveReview({ movieId }: Props) {
  const [review, setReview] = useState('')
  const [hasPermission, setHasPermission] = useState(false)

  async function checkIsUserMember() {
    const user = await isUserMember()
    setHasPermission(user)
  }

  async function saveReview() {
    try {
      const payload = {
        movieId,
        text: review
      }
  
      await makePrivateRequest({
        url: '/reviews',
        method: 'POST',
        data: payload
      })
  
      Alert.alert('', 'Avaliação salva com sucesso 🥳', [
        { text: 'OK', style: 'cancel' }
      ])
  
      setReview('')
    }
    catch (e) {
      Alert.alert('Ocorreu um erro 😕', 'O campo não pode estar vazio!', [
        { text: 'OK', style: 'cancel' }
      ])
    }
  }

  useEffect(() => {
    checkIsUserMember()
  }, [])

  return (
    <>
      {hasPermission && (
        <View style={ styles.saveReviewContainer }>
          <TextInput
            placeholder={ 'Deixe sua avaliação aqui' }
            placeholderTextColor={ colors.subtitleDark }
            multiline={ true }
            textAlignVertical='top'
            scrollEnabled={ true }
            style={ styles.saveReviewInput }
            value={ review }
            onChangeText={ text => setReview(text) }
          />

          <Button
            title='Salvar Avaliação'
            onPress={ () => saveReview() }
          />
        </View>
    )}
    </>
  )
}

const styles = StyleSheet.create({
  saveReviewContainer: {
    backgroundColor: colors.mediumGray,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20
  },

  saveReviewInput: {
    minHeight: 100,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.whiteBorder,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    lineHeight: 22,
    color: colors.darkGray,
    marginBottom: 15
  }
})