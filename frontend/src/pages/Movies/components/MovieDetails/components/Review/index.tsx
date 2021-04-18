import { ReactComponent as Star } from '../../../../../../core/assets/star-review.svg'
import './styles.scss'

const Review = () => {
  return (
    <>
      <div>
        <Star className="ml-15" />
        <span className="review-username">Maria Silva</span>
      </div>
      <div className="review-text-container">
        <p className="review-text">
        Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.
        </p>
      </div>
    </>
  )
}

export default Review