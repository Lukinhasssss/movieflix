import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Router } from 'react-router'
import Movies from '..'
import history from '../../../core/utils/history'
import { moviesResponse } from './fixtures'

const server = setupServer(
  rest.get('http://localhost:8080/movies', (req, res, ctx) => {
    return res(ctx.json(moviesResponse))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('should render Movies', async () => {
  render(
    <Router history={ history }>
      <Movies />
    </Router>
  )

  expect(screen.getByText('Filtrar por gênero')).toBeInTheDocument()
  expect(screen.getAllByTitle('Loading...')).toHaveLength(2)

  await waitFor(() => expect(screen.queryAllByTitle('Loading...')).toHaveLength(0))

  expect(screen.getByText('Coringa')).toBeInTheDocument()
  expect(screen.getByText('2019')).toBeInTheDocument()
  expect(screen.getByText('Coloque um sorriso nessa cara.')).toBeInTheDocument()

  expect(screen.getByText('Demon Slayer: O Trem Infinito')).toBeInTheDocument()
  expect(screen.getByText('2020')).toBeInTheDocument()
  expect(screen.getByText('Com sua lâmina, dê um fim ao pesadelo.')).toBeInTheDocument()

  expect(screen.getByText('1')).toBeInTheDocument()
  expect(screen.getByText('2')).toBeInTheDocument()
  expect(screen.getByText('3')).toBeInTheDocument()
})