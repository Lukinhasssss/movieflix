// import { useParams } from 'react-router'
import { ReactComponent as MovieImage } from '../../../../core/assets/movie-image.svg'
import Review from './components/Review'
import './styles.scss'

// type ParamsType = {
//   movieId: string
// }

const MovieDetails = () => {
  // const { movieId } = useParams<ParamsType>()

  return (
    <div className="movie-details-container">
      <div className="movie-details-content">
        <div className="movie-details-image-container">
          <MovieImage className="movie-details-image" />
        </div>

        <div className="movie-details-info">
          <h1 className="movie-details-title">O Retorno do Rei</h1>
          <span className="movie-details-year">2013</span>
          <h3 className="movie-details-subtitle">O olho do inimigo está se movendo</h3>
          <div className="movie-details-description-container">
            <p className="movie-details-description-text">
              O confronto final entre as forças do bem e do mal que lutam pelo controle do futuro da Terra Média se aproxima. Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf e Pippin partam para o local na intenção de ajudar a resistência. Um exército é reunido por Theoden em Rohan, em mais uma tentativa de deter as forças de Sauron. Enquanto isso, Frodo, Sam e Gollum seguem sua viagem rumo à Montanha da Perdição para destruir o anel.Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf e Pippin partam para o local na intenção de ajudar a resistência. Um exército é reunido por Theoden em Rohan, em mais uma tentativa de deter as forças de Sauron. Enquanto isso, Frodo, Sam e Gollum seguem sua viagem rumo à Montanha da Perdição para destruir o anel.
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

      <div className="reviews-container">
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    </div>
  )
}

export default MovieDetails