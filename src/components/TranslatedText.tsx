import { GrFormClose } from 'react-icons/gr'
import { infoFav } from '../assets/icons'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { Modal } from './'
import { FavText } from '../models/model'

const TranslatedText: React.FC<FavText> = ({
  to,
  from,
  word,
  translatedWord,
  title,
}) => {
  const { setCheckFav } = useActions()
  const { checkFav } = useAppSelector((state) => state.modal)

  return (
    <>
      <div className="info-text" onClick={() => setCheckFav(true)}>
        <div className="info-wrapper">
          <p>{title}</p>
          <img src={infoFav} alt="" />
        </div>
      </div>
      {checkFav && (
        <Modal>
          <div className="exit">
            <button onClick={() => setCheckFav(false)}>
              <GrFormClose />
            </button>
          </div>
          <div className="info-from">
            <span>
              <p>{from}</p>
              <p>{word}</p>
            </span>
          </div>
          <div className="line" />
          <div className="info-to">
            <span>
              <p>{to}</p>
              <p>{translatedWord}</p>
            </span>
          </div>
        </Modal>
      )}
    </>
  )
}

export default TranslatedText
