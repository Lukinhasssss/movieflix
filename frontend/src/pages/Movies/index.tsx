import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MovieResponse } from '../../core/types/Movie';
import { makePrivateRequest } from '../../core/utils/requests';
import Filter from './components/Filter';
import MovieCard from './components/MovieCard';
import './styles.scss';



const Movies = () => {
  const [moviesResponse, setMoviesResponse] = useState<MovieResponse>()

  const getProducts = () => {
    const params = {
      linesPerPage: 12
    }

    makePrivateRequest({ url: '/movies', params })
      .then(response => {
        setMoviesResponse(response.data)
      })
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="movies-container">
      <Filter />

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