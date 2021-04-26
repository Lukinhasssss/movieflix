import ContentLoader from "react-content-loader"

const MovieInfoLoader = () => (
  <ContentLoader 
    speed={2}
    width={'100%'}
    height={370}
    viewBox="0 0 1150 370"
    backgroundColor="#727272"
    foregroundColor="#929292"
  >
    <rect x="0" y="0" rx="10" ry="10" width="1150" height="370" />
  </ContentLoader>
)

export default MovieInfoLoader