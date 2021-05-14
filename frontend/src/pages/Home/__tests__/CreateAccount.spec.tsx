import { render, screen } from '@testing-library/react'
import { Router } from 'react-router'
import history from '../../../core/utils/history'
import CreateAccount from '../CreateAccount'

test('should render Home screen with create account form', () => {
  render(
    <Router history={ history }>
      <CreateAccount />
    </Router>
  )

  const homeTitle = screen.getByText('Avalie Filmes')
  const subtitle = screen.getByText('Diga o que você achou do seu filme favorito')
  const mainImage = screen.getByTestId('main-image')
  const formTitle = screen.getByText('Criar Conta')
  const buttonTitle = screen.getByText('Cadastrar')
  const nameInput = screen.getByTestId('name')
  const emailInput = screen.getByTestId('email')
  const passwordInput = screen.getByTestId('password')

  expect(homeTitle).toBeInTheDocument()
  expect(subtitle).toBeInTheDocument()
  expect(mainImage).toBeInTheDocument()
  expect(formTitle).toBeInTheDocument()
  expect(buttonTitle).toBeInTheDocument()
  expect(nameInput).toBeInTheDocument()
  expect(emailInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
})