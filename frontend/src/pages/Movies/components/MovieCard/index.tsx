import { ReactComponent as MovieImage } from '../../../../core/assets/movie-image.svg';
import './styles.scss'

const MovieCard = () => {
  return (
    <div className="movie-card-container">
      <MovieImage className="movie-image" />

      <div className="movie-info-container">
        <h3 className="movie-title">
          O Retorno do Rei
        </h3>
        <span className="movie-year">2013</span>
        <h4 className="movie-subtitle">O olho do inimigo está se movendo.</h4>
      </div>
    </div>
  )
}

export default MovieCard