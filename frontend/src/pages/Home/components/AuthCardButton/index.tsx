import { ReactComponent as Arrow } from '../../../../core/assets/arrow.svg'
import './styles.scss'

type Props = {
  buttonTitle: string
}

const AuthCardButton = ({ buttonTitle }: Props) => {
  return (
    <button className="auth-button-container">
      <div className="auth-button-text">
        { buttonTitle }
      </div>
      <div className="auth-button-image-container">
        <Arrow />
      </div>
    </button>
  )
}

export default AuthCardButton