import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Movie } from '../../../../core/types/Movie'
import { makePrivateRequest } from '../../../../core/utils/requests'
import MovieReview from './components/MovieReview'
import './styles.scss'


type ParamsType = {
  movieId: string
}

const MovieDetails = () => {
  const { movieId } = useParams<ParamsType>()
  const [movie, setMovie] = useState<Movie>()

  const getMovies = useCallback(() => {
    makePrivateRequest({ url: `/movies/${movieId}` })
      .then(response => {
        setMovie(response.data)
      })
  }, [movieId])

  useEffect(() => {
    getMovies()
  })

  return (
    <div className="movie-details-container">
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

      <div className="post-new-review-container">
        <textarea placeholder="Digite aqui sua avaliação" className="new-review-text" />
        <button className="new-review-button">
          <span className="new-review-button-text">Salvar avaliação</span>
        </button>
      </div>

      {movie?.reviews.length !== 0 && (
        <div className="reviews-container">
          {movie?.reviews.map(review => (
            <MovieReview review={ review } key={review.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieDetails