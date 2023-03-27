import { GrFormClose } from 'react-icons/gr'
import { infoFav } from '../assets/icons'
import { Modal } from './'
import { FavText } from '../models/model'

interface ITranslatedText extends FavText {
  handleInfoClick: (id: number) => void
  handleCloseModal: () => void
  isOpenFav: boolean
}

const TranslatedText: React.FC<ITranslatedText> = ({
  to,
  from,
  word,
  translatedWord,
  title,
  isOpenFav,
  handleInfoClick,
  handleCloseModal,
  id,
}) => {
  return (
    <>
      <div className="info-text" onClick={() => handleInfoClick(id!)}>
        <div className="info-wrapper">
          <p>{title}</p>
          <img src={infoFav} alt={title} />
        </div>
      </div>
      {isOpenFav && (
        <Modal isOpenFav={isOpenFav}>
          <div className="exit">
            <button onClick={handleCloseModal}>
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
