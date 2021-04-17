import Filter from './components/Filter';
import MovieCard from './components/MovieCard';

import './styles.scss'

const Movies = () => {
  return (
    <div className="movie-container">
      <Filter />

      <div className="movie-content">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  )
}

export default Movies;