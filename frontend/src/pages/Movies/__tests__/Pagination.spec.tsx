import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from '../components/Pagination'

test('should render Pagination', () => {
  const totalPages = 3
  const activePage = 0
  const onChange = () => null

  render(
    <Pagination
      totalPages={ totalPages }
      activePage={ activePage }
      onChange={ onChange }
    />
  )

  const previousElement = screen.getByTestId('arrow-icon-previous')
  const nextElement = screen.getByTestId('arrow-icon-next')
  const firstPageItem = screen.getByText('1')
  const secondPageItem = screen.getByText('2')
  const thirdPageItem = screen.getByText('3')

  expect(previousElement).toBeInTheDocument()
  expect(previousElement).toHaveClass('page-inactive')
  expect(nextElement).toBeInTheDocument()
  expect(nextElement).toHaveClass('page-active')
  expect(firstPageItem).toBeInTheDocument()
  expect(firstPageItem).toHaveClass('active')
  expect(secondPageItem).toBeInTheDocument()
  expect(secondPageItem).not.toHaveClass('active')
  expect(thirdPageItem).toBeInTheDocument()
  expect(thirdPageItem).not.toHaveClass('active')
})

test('should enable previous action and disable next action', () => {
  const totalPages = 3
  const activePage = 2
  const onChange = () => null

  render(
    <Pagination
      totalPages={ totalPages }
      activePage={ activePage }
      onChange={ onChange }
    />
  )

  const previousElement = screen.getByTestId('arrow-icon-previous')
  const nextElement = screen.getByTestId('arrow-icon-next')

  expect(previousElement).toBeInTheDocument()
  expect(previousElement).toHaveClass('page-active')
  expect(nextElement).toBeInTheDocument()
  expect(nextElement).toHaveClass('page-inactive')
})

test('should trigger onChange action', () => {
  const totalPages = 3
  const activePage = 1
  const onChange = jest.fn()

  render(
    <Pagination
      totalPages={ totalPages }
      activePage={ activePage }
      onChange={ onChange }
    />
  )

  const previousElement = screen.getByTestId('arrow-icon-previous')
  const nextElement = screen.getByTestId('arrow-icon-next')
  const firstPageItem = screen.getByText('1')

  userEvent.click(firstPageItem)
  expect(onChange).toHaveBeenCalledWith(0)

  userEvent.click(previousElement)
  expect(onChange).toHaveBeenCalledWith(0)

  userEvent.click(nextElement)
  expect(onChange).toHaveBeenCalledWith(2)
})