import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { LoginData, makeLogin } from '../../core/utils/requests'

import { ReactComponent as MainImage } from '../../core/assets/main.svg'
import { ReactComponent as Arrow } from '../../core/assets/arrow-right.svg'
import './styles.scss'
import { saveSessionData } from '../../core/utils/auth'
import { useHistory } from 'react-router'

const Home = () => {
  const { register, handleSubmit } = useForm<LoginData>()
  const [hasError, setHasError] = useState(false)
  const history = useHistory()

  const onSubmit = (data: LoginData) => {
    makeLogin(data)
      .then(response => {
        setHasError(false)
        saveSessionData(response.data)
        history.push('/movies')
      })
      .catch(() => {
        setHasError(true)
      })
  }

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

        <form
        onSubmit={ handleSubmit(onSubmit) }
          className="login-form-container"
        >
          <h1 className="login-form-title">Login</h1>

          {hasError && (
            <div className="alert">
              <p className="alert-text">Usuário ou senha inválidos!</p>
              <span className="close" onClick={ () => setHasError(false) }>X</span>
            </div>
          )}

          <input
            {...register("username", { required: true },)}
            type="email"
            placeholder="Email"
            className="login-form-input"
          />
          <input
            {...register("password", { required: true })}
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