import { ReactComponent as MainImage } from '../../core/assets/main.svg'
import { ReactComponent as Arrow } from '../../core/assets/arrow-right.svg'

import './styles.scss'

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-left">
          <h1 className="home-title">Avalie Filmes</h1>
          <h2 className="home-subtitle">Diga o que você achou do seu filme favorito</h2>
          <div className="home-image-container">
            <MainImage />
          </div>
        </div>

        <form className="login-form-container">
          <h1 className="login-form-title">Login</h1>
          <input
            type="email"
            placeholder="Email"
            className="login-form-input"
          />
          <input
            type="password"
            placeholder="Senha"
            className="login-form-input"
          />
          <button className="login-button-container">
            <div className="login-button-text">
              Logar
            </div>
            <div className="login-button-image-container">
              <Arrow />
            </div>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home