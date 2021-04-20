import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Filter, { FilterData } from './components/Filter';
import MovieCard from './components/MovieCard';
import { MovieResponse } from '../../core/types/Movie';
import { makePrivateRequest } from '../../core/utils/requests';

import './styles.scss';

const Movies = () => {
  const [moviesResponse, setMoviesResponse] = useState<MovieResponse>()

  const getMovies = useCallback((filter?: FilterData) => {
    const params = {
      linesPerPage: 8,
      genreId: filter?.genreId
    }

    makePrivateRequest({ url: '/movies', params })
      .then(response => {
        setMoviesResponse(response.data)
      })
  }, [])

  useEffect(() => {
    getMovies()
  }, [getMovies])

  return (
    <div className="movies-container">
      <Filter onSearch={ filter => getMovies(filter) } />

      <div className="movie-content">
        {moviesResponse?.content.map(movie => (
          <Link to={ `/movies/${movie.id}` } key={ movie.id }>
            <MovieCard movie={ movie } />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Movies;