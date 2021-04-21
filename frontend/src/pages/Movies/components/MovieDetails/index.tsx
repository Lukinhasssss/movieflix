import { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { toast } from 'react-toastify';

import { Movie } from '../../../../core/types/Movie'
import { getAccessTokenDecoded } from '../../../../core/utils/auth'
import { makePrivateRequest } from '../../../../core/utils/requests'
import MovieReview from './components/MovieReview'

import './styles.scss'

type ParamsType = {
  movieId: string
}

const MovieDetails = () => {
  const history = useHistory()
  const { movieId } = useParams<ParamsType>()
  const [movie, setMovie] = useState<Movie>()
  const [hasPermission, setHasPermission] = useState(false)
  const [review, setReview] = useState('')

  const getMovies = useCallback(() => {  
    makePrivateRequest({ url: `/movies/${movieId}` })
      .then(response => {
        setMovie(response.data)
      })
  }, [movieId])

  const saveReview = () => {
    const payload = {
      movieId,
      text: review
    }

    makePrivateRequest({
      url: '/reviews',
      method: 'POST',
      data: payload
    }).then(() => {
      history.push(`/`)
      toast.success('Avaliação salva com sucesso 😄', { delay: 500 })
      // window.location.reload() // Da certo mas para este caso não fica muito legal.
    }).catch(() => {
      toast.error('Ocorreu um erro ao salvar sua avaliação 😕')
    })
  }

  useEffect(() => {
    const currentUser = getAccessTokenDecoded()
    setHasPermission(currentUser.authorities.toString() === 'ROLE_MEMBER')

    getMovies()
  }, [getMovies])

  const handleChangeReview = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value)
  }

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

      {hasPermission && (
        <div className="post-new-review-container">
          <textarea
            value={ review }
            placeholder="Digite aqui sua avaliação"
            className="new-review-text"
            onChange={ handleChangeReview }
          />

          <button
            className="new-review-button"
            onClick={ saveReview }
          >
            <span className="new-review-button-text">Salvar avaliação</span>
          </button>
        </div>
      )}

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