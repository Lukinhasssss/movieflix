export type MovieResponse = {
  content: Movie[]
  totalPages: number
}

export type Movie = {
  id: number
  title: string
  subTitle: string
  year: number
  imgUrl: string
  synopsis: string
  genreId: number
  reviews: Review[]
}

export type Review = {
  id: number
  text: string
  movieId: number
  user: User
}

export type Genre = {
  id: number
  name: string
}

type User = {
  id: number
  name: string
}