import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Filter, { FilterData } from './components/Filter';
import MovieCard from './components/MovieCard';
import { MovieResponse } from '../../core/types/Movie';
import { makePrivateRequest } from '../../core/utils/requests';

import './styles.scss';
import Pagination from './components/Pagination';

const Movies = () => {
  const [moviesResponse, setMoviesResponse] = useState<MovieResponse>()
  const [activePage, setActivePage] = useState(0)

  const getMovies = useCallback((filter?: FilterData) => {
    const params = {
      linesPerPage: 8,
      genreId: filter?.genreId,
      page: activePage
    }

    makePrivateRequest({ url: '/movies', params })
      .then(response => {
        setMoviesResponse(response.data)
      })
  }, [activePage])

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

      {moviesResponse && (
        <Pagination
          totalPages={ moviesResponse.totalPages }
          activePage={ activePage }
          onChange={ page => setActivePage(page) }
        />
      )}
    </div>
  )
}

export default Movies;