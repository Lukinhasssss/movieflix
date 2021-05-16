import { render, screen } from '@testing-library/react'
import { Movie } from '../../../core/types/Movie'
import MovieCard from '../components/MovieCard'

test('should render MovieCard', () => {
  const movie = {
    imgUrl: 'image.jpg',
    title: 'Coringa',
    year: 2019,
    subTitle: 'Coloque um sorriso nessa cara.'
  } as Movie

  render(
    <MovieCard movie={ movie } />
  )

  const imgUrl = screen.getByTestId('movie-image')
  const title = screen.getByText('Coringa')
  const year = screen.getByText('2019')
  const subTitle = screen.getByText('Coloque um sorriso nessa cara.')

  expect(imgUrl).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(year).toBeInTheDocument()
  expect(subTitle).toBeInTheDocument()
})