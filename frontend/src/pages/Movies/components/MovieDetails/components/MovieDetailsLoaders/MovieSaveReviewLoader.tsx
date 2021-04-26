import ContentLoader from "react-content-loader"

const MovieSaveReviewLoader = () => (
  <ContentLoader 
    speed={2}
    width={'100%'}
    height={'100%'}
    style={{ marginBottom: 30 }}
    viewBox="0 0 1150 170"
    backgroundColor="#727272"
    foregroundColor="#929292"
  >
    <rect x="0" y="0" rx="10" ry="10" width="1150" height="170" />
  </ContentLoader>
)

export default MovieSaveReviewLoader