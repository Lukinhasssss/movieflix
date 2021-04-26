import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { LoginData, makeLogin } from '../../core/utils/requests'
import { saveSessionData } from '../../core/utils/auth'
import { useHistory } from 'react-router'
import AuthCard from './components/AuthCard/AuthCard'
import AuthCardButton from './components/AuthCardButton'

import { ReactComponent as MainImage } from '../../core/assets/main.svg'
import './styles.scss'

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

        <AuthCard title="Login">
          <form
            onSubmit={ handleSubmit(onSubmit) }
          >
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
              className="auth-input"
            />
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Senha"
              className="auth-input"
            />
            <AuthCardButton buttonTitle="Logar" />
          </form>

          <div className="no-account-container">
            <p>Não tem conta?</p>
            <Link to="/criar-conta">
              Cadastre-se
            </Link>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}

export default Home