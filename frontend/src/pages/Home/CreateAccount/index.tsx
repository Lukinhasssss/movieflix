import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { makeLogin, makeRequest } from '../../../core/utils/requests'
import { saveSessionData } from '../../../core/utils/auth'
import { useHistory } from 'react-router'
import AuthCard from '../components/AuthCard/AuthCard'
import AuthCardButton from '../components/AuthCardButton'

import { ReactComponent as MainImage } from '../../../core/assets/main.svg'
import './styles.scss'

type CreateAccountData = {
  name: string
  email: string
  password: string
}

const CreateAccount = () => {
  const { register, handleSubmit } = useForm<CreateAccountData>()
  const [hasError, setHasError] = useState(false)
  const history = useHistory()

  const onSubmit = (createAccountData: CreateAccountData) => {
    const payload = {
      name: createAccountData.name,
      email: createAccountData.email,
      password: createAccountData.password,
      roles: [{
        id: 2 // Por padrão o usuário será membro para que a pessoa possa testar a aplicação
      }]
    }

    makeRequest({
      url: '/users',
      method: 'POST',
      data: payload
    }).then(response => {
      const loginData = {
        username: response.data.email,
        password: createAccountData.password
      }

      makeLogin(loginData)
        .then(response => {
          setHasError(false)
          saveSessionData(response.data)
          history.push('/movies')
        })
        .catch(() => {
          setHasError(true)
        })
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

        <AuthCard title="Criar Conta">
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
              {...register("name", { required: true },)}
              type="text"
              placeholder="Nome"
              className="auth-input"
            />
            <input
              {...register("email", { required: true },)}
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
            <AuthCardButton buttonTitle="Cadastrar" />
          </form>
        </AuthCard>
      </div>
    </div>
  )
}

export default CreateAccount