import { GrFormClose } from 'react-icons/gr'
import { FavText } from '../models/model'
import { infoFav } from '../assets/icons'
import { Modal } from '.'

interface ISavedFav extends FavText {
  handleInfoClick: (id: number) => void
  handleCloseModal: () => void
  isOpenFav: boolean
  removeFav: (id: string) => void
}

const SavedFav: React.FC<ISavedFav> = ({
  to,
  from,
  word,
  translatedWord,
  title,
  isOpenFav,
  handleInfoClick,
  handleCloseModal,
  removeFav,
  id,
}) => {
  return (
    <>
      <div className="info-text">
        <div className="info-wrapper">
          <p onClick={() => handleInfoClick(id!)}>{title}</p>
          <button id="infoFav" style={{ display: 'none' }} />
          <label htmlFor="infoFav">
            <img src={infoFav} alt={title} onClick={() => removeFav(title)} />
          </label>
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

export default SavedFav
