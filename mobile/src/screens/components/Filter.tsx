import { Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Genre } from '../../core/types/Movie'
import { makePrivateRequest } from '../../core/utils/request'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

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
        <View>
          <ScrollView>
            {genres?.map(genre => (
              <TouchableOpacity
                key={ genre.id }
                onPress={() => {
                  setShowGenres(!showGenres)
                  handleChangeGenre(genre)
                }}
              >
                <Text>{ genre.name }</Text>
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
            { !genre?.id || genre.id === 0 ? 'Todos os filmes' : genre?.name }
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
    marginTop: 20,
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
  }
})