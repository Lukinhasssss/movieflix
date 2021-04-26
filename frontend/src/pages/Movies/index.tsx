import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Filter from './components/Filter';
import MovieCard from './components/MovieCard';
import { Genre, MovieResponse } from '../../core/types/Movie';
import { makePrivateRequest } from '../../core/utils/requests';
import Pagination from './components/Pagination';

import './styles.scss';
import MovieCardLoader from './components/MovieCardLoader';

const Movies = () => {
  const [moviesResponse, setMoviesResponse] = useState<MovieResponse>()
  const [activePage, setActivePage] = useState(0)
  const [genre, setGenre] = useState<Genre>()
  const [isLoading, setIsLoading] = useState(true)

  const getMovies = useCallback(() => {
    const params = {
      linesPerPage: 12,
      genreId: genre?.id,
      page: activePage
    }

    makePrivateRequest({ url: '/movies', params })
      .then(response => {
        setMoviesResponse(response.data)
        setIsLoading(false)
      })
  }, [activePage, genre?.id])

  useEffect(() => {
    getMovies()
  }, [getMovies])

  const handleChangeGenre = (genre: Genre) => {
    setActivePage(0)
    setGenre(genre)
  }

  return (
    <div className="movies-container">
      <Filter
        genre={ genre }
        handleChangeGenre={ handleChangeGenre }
      />

      <div className="movie-content">
        { isLoading ? (
          <MovieCardLoader />
        ) : (
          moviesResponse?.content.map(movie => (
            <Link to={ `/movies/${movie.id}` } key={ movie.id }>
              <MovieCard movie={ movie } />
            </Link>
          ))
        )}
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