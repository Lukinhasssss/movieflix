import { render, screen } from '@testing-library/react'
import AuthCardButton from '../components/AuthCardButton'

test('should render AuthCardButton', () => {
  render(
    <AuthCardButton
      buttonTitle="LOGAR"
    />
  )

  const buttonTitleElement = screen.getByText('LOGAR')
  const arrowImageElement = screen.getByTestId('arrow-image')

  expect(buttonTitleElement).toBeInTheDocument()
  expect(arrowImageElement).toBeInTheDocument()
})