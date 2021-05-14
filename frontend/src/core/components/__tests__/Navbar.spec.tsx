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

  const logoText = screen.getByText('MovieFlix')

  expect(logoText).toBeInTheDocument()
  expect(screen.queryByText(/sair/i)).not.toBeInTheDocument()
})