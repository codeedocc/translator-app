import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { GrFormClose } from 'react-icons/gr'
import { FavText } from '../models/model'
import { Modal } from '.'

interface ISavedFav extends FavText {
  isOpenFav: boolean
  handleInfoClick: (id: number) => void
  changeAdded: (title: string) => void
  handleCloseModal: () => void
}

const SavedFav: React.FC<ISavedFav> = ({
  translatedWord,
  isOpenFav,
  added,
  title,
  from,
  word,
  id,
  to,
  handleCloseModal,
  handleInfoClick,
  changeAdded,
}) => {
  return (
    <>
      <div className={added ? 'info-text' : 'info-text added'}>
        <div className="info-wrapper">
          <p onClick={() => handleInfoClick(id!)}>{title}</p>
          {added ? (
            <button onClick={() => changeAdded(title!)}>
              <AiFillStar />
            </button>
          ) : (
            <button onClick={() => changeAdded(title!)}>
              <AiOutlineStar />
            </button>
          )}
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
