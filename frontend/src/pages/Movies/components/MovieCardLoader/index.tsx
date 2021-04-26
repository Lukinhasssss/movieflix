import ContentLoader from "react-content-loader"

const MovieCardLoader = () => {
  const loaderQuantity = [0, 1]

  return (
    <>
      {loaderQuantity.map(loader => (
        <ContentLoader key={ loader }
          speed={1}
          width={270}
          height={340}
          viewBox="0 0 270 340"
          backgroundColor="#727272"
          foregroundColor="#929292"
        >
          <rect x="0" y="0" rx="10" ry="10" width="270" height="340" />
        </ContentLoader>
      ))}
    </>
  )
}

export default MovieCardLoader