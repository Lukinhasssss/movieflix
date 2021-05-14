import { render, screen } from '@testing-library/react'
import AuthCard from '../components/AuthCard/AuthCard'

test('should render AuthCard', () => {
  const title = "Login"
  const children = "Hello World"

  render(
    <AuthCard
      title={ title }
      children={ children }
    />
  )

  const titleElement = screen.getByText(title)
  const childrenElement = screen.getByText(children)

  expect(titleElement).toBeInTheDocument()
  expect(childrenElement).toBeInTheDocument()
})