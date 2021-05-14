import { render, screen } from '@testing-library/react'
import AuthCardButton from '../components/AuthCardButton'

test('should render AuthCardButton', () => {
  render(
    <AuthCardButton
      buttonTitle="LOGAR"
    />
  )

  const buttonTitle = screen.getByText('LOGAR')
  const arrowImage = screen.getByTestId('arrow-image')

  expect(buttonTitle).toBeInTheDocument()
  expect(arrowImage).toBeInTheDocument()
})