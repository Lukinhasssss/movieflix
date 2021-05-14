import { render, screen } from '@testing-library/react'
import { Router } from 'react-router'
import history from '../../utils/history'
import Navbar from '../Navbar'

test('should render Navbar with only the logo text when does not have user logged', () => {
  render(
    <Router history={ history }>
      <Navbar />
    </Router>
  )

  const logoTextElement = screen.getByText('MovieFlix')

  expect(logoTextElement).toBeInTheDocument()
  expect(screen.queryByText(/sair/i)).not.toBeInTheDocument()
})