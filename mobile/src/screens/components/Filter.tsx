import { Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Genre } from '../../core/types/Movie'
import { makePrivateRequest } from '../../core/utils/request'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

type Props = {
  genre?: Genre
  handleChangeGenre: (genre: Genre) => void
}

export default function Filter({ genre, handleChangeGenre }: Props) {
  const [genres, setGenres] = useState<Genre[]>()
  const [showGenres, setShowGenres] = useState(false)

  async function getGenres() {
    const response = await makePrivateRequest({ url: '/genres' })
    setGenres([{id: 0, name: 'Todos'}, ...response.data])
  }

  useEffect(() => {
    getGenres()
  }, [])

  return (
    <View>
      <Modal
        visible={ showGenres }
        animationType="fade"
        transparent={ true }
        presentationStyle="overFullScreen"
      >
        <View style={ styles.modalContainer }>
          <ScrollView contentContainerStyle={ styles.modalContent }>
            {genres?.map(genre => (
              <TouchableOpacity
                style={ styles.modalItem }
                key={ genre.id }
                onPress={() => {
                  setShowGenres(!showGenres)
                  handleChangeGenre(genre)
                }}
              >
                <Text style={ styles.modalItemText }>
                  { genre.name }
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>

      <View style={ styles.filterContainer }>
        <TouchableOpacity
          onPress={ () => setShowGenres(!showGenres) }
          style={ styles.filterSelectContainer }
          activeOpacity={ 0.2 }
        >
          <Text style={ styles.filterSelectText }>
            { !genre?.id || genre.id === 0 ? 'Todos' : genre?.name }
          </Text>

          <Feather
            name="chevron-down"
            size={ 28 }
            color={ colors.whiteBorder }
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  filterContainer: {
    width: '100%',
    height: 80,
    backgroundColor: colors.mediumGray,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20
  },

  filterSelectContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.whiteBorder,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12
  },

  filterSelectText: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.015,
    color: colors.whiteBorder
  },

  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  modalContent: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
    backgroundColor: colors.darkGray,
    borderRadius: 10,
    padding: 15
  },

  modalItem: {
    width: '100%',
    backgroundColor: colors.mediumGray,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5
  },

  modalItemText: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.015,
    color: colors.whiteBorder
  }
})