import { render, screen } from '@testing-library/react'
import { Router } from 'react-router'
import Home from '..'
import history from '../../../core/utils/history'

test('should render Home screen with login form', () => {
  render(
    <Router history={ history }>
      <Home />
    </Router>
  )

  const homeTitle = screen.getByText('Avalie Filmes')
  const subtitle = screen.getByText('Diga o que você achou do seu filme favorito')
  const mainImage = screen.getByTestId('main-image')
  const formTitle = screen.getByText('Login')
  const buttonTitle = screen.getByText('Logar')
  const emailInput = screen.getByTestId('email')
  const passwordInput = screen.getByTestId('password')

  expect(homeTitle).toBeInTheDocument()
  expect(subtitle).toBeInTheDocument()
  expect(mainImage).toBeInTheDocument()
  expect(formTitle).toBeInTheDocument()
  expect(buttonTitle).toBeInTheDocument()
  expect(emailInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
  expect(screen.getByText('Não tem conta?')).toBeInTheDocument()
  expect(screen.getByText(/cadastre-se/i)).toBeInTheDocument()
})