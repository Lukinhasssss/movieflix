import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Movie } from '../../../../core/types/Movie'
import { getAccessTokenDecoded } from '../../../../core/utils/auth'
import { makePrivateRequest } from '../../../../core/utils/requests'
import ListReviews from './components/ListReviews'
import MovieInfoLoader from './components/MovieDetailsLoaders/MovieInfoLoader'
import MovieListReviewsLoader from './components/MovieDetailsLoaders/MovieListReviewsLoader'
import MovieSaveReviewLoader from './components/MovieDetailsLoaders/MovieSaveReviewLoader'
import SaveReview from './components/SaveReview'

import './styles.scss'

type ParamsType = {
  movieId: string
}

const MovieDetails = () => {
  const { movieId } = useParams<ParamsType>()
  const [movie, setMovie] = useState<Movie>()
  const [hasPermission, setHasPermission] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getMovies = useCallback(() => {
    makePrivateRequest({ url: `/movies/${movieId}` })
      .then(response => {
        setMovie(response.data)
        setIsLoading(false)
      })
  }, [movieId])

  useEffect(() => {
    const currentUser = getAccessTokenDecoded()
    setHasPermission(currentUser.authorities.toString() === 'ROLE_MEMBER')

    getMovies()
  }, [getMovies])

  return (
    <div className="movie-details-container">
      {isLoading ? (
        <MovieInfoLoader />
      ) : (
        <div className="movie-details-content">
          <div className="movie-details-image-container">
            <img src={ movie?.imgUrl } alt={ movie?.title } className="movie-details-image" />
          </div>

          <div className="movie-details-info">
            <h1 className="movie-details-title">{ movie?.title }</h1>
            <span className="movie-details-year">{ movie?.year }</span>
            <h3 className="movie-details-subtitle">{ movie?.subTitle }</h3>
            <div className="movie-details-description-container">
              <p className="movie-details-description-text">
                { movie?.synopsis }
              </p>
            </div>
          </div>
        </div>
      )}

      {hasPermission && isLoading ? (
        <MovieSaveReviewLoader />
      ) : hasPermission && (
        <SaveReview movieId={ movieId } />
      )}

      {isLoading ? (
        <MovieListReviewsLoader />
      ) : (
        movie?.reviews.length !== 0 && (
          <div className="reviews-container">
            {movie?.reviews.map(review => (
              <ListReviews review={ review } key={review.id} />
            ))}
          </div>
        )
      )}
    </div>
  )
}

export default MovieDetails