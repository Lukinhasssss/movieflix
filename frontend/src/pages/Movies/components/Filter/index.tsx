import { useEffect, useState } from 'react'
import Select from 'react-select'
import { Genre } from '../../../../core/types/Movie'
import { makePrivateRequest } from '../../../../core/utils/requests'
import './styles.scss'

export type FilterData = {
  genreId?: number
}

type Props = {
  onSearch: (filter: FilterData) => void
}

const Filter = ({ onSearch }: Props) => {
  const [isLoadingGenres, setIsLoadingGenres] = useState(false)
  const [genres, setGenres] = useState<Genre[]>()
  const [genre, setGenre] = useState<Genre>()

  const handleChangeGenre = (genre: Genre) => {
    setGenre(genre)

    onSearch({ genreId: genre?.id })
  }

  useEffect(() => {
    setIsLoadingGenres(true)

    makePrivateRequest({ url: '/genres' })
      .then(response => {
        setGenres(response.data)
      })
      .finally(() => {
        setIsLoadingGenres(false)
      })
  }, [])

  return (
    <div className="filter-container">
      <Select
        name="genres"
        key={ `select-${genre?.id}` }
        value={ genre }
        isLoading={ isLoadingGenres }
        options={ genres }
        getOptionValue={ (option: Genre) => String(option.id) }
        getOptionLabel={ (option: Genre) => option.name }
        className="filter-select-container"
        classNamePrefix="genres-select"
        placeholder="Filtrar por gênero"
        isClearable
        onChange={ value => handleChangeGenre(value as Genre) }
      />
    </div>
  )
}

export default Filter