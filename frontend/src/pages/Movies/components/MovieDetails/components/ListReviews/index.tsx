import { ReactComponent as Star } from '../../../../../../core/assets/star-review.svg'
import { Review } from '../../../../../../core/types/Movie'
import './styles.scss'

type Props = {
  review: Review
}

const ListReviews = ({ review }: Props) => {
  return (
    <>
      <div>
        <Star className="ml-15" data-testid="star-image" />
        <span className="review-username">{ review.user.name }</span>
      </div>
      <div className="review-text-container">
        <p className="review-text">
        { review.text }
        </p>
      </div>
    </>
  )
}

export default ListReviews