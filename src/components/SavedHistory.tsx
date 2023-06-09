import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { useEffect, useRef } from 'react'
import { useAppSelector } from '../hooks/redux'
import { GrFormClose } from 'react-icons/gr'
import { useActions } from '../hooks/actions'
import { History } from '../models/model'
import { Modal } from './'

interface ISavedHistory {
  translatedWord: string
  formatedDate: string
  formatedTime: string
  alertExists: boolean
  addedToFav: boolean
  alertEmpty: boolean
  isOpenFav: boolean
  item: History
  word: string
  from: string
  to: string
  id: string
  handeAddFav: (item: History, favName: string) => void
  handleInfoClick: (id: string, item: History) => void
  removeAdded: (item: History) => void
  removeHistory: (id: string) => void
  handleCloseModal: () => void
}

const SavedHistory: React.FC<ISavedHistory> = ({
  translatedWord,
  formatedDate,
  formatedTime,
  alertExists,
  addedToFav,
  alertEmpty,
  isOpenFav,
  word,
  item,
  from,
  to,
  id,
  handleCloseModal,
  handleInfoClick,
  removeHistory,
  handeAddFav,
  removeAdded,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { setFavName } = useActions()

  const { favName } = useAppSelector((state) => state.modal)

  useEffect(() => {
    inputRef.current?.focus()
  }, [isOpenFav])

  return (
    <>
      {isOpenFav && (
        <Modal isOpenFav={isOpenFav}>
          <div className="exit">
            <button onClick={handleCloseModal}>
              <GrFormClose />
            </button>
          </div>

          <div className="modal-sides">
            <div className="modal-title">
              <p>Как назвать?</p>
            </div>

            <div className="modal-input">
              <input
                type="text"
                ref={inputRef}
                value={favName}
                onChange={(e) => setFavName(e.target.value)}
              />

              {alertEmpty && (
                <p style={{ color: 'red' }}>Название не может быть пустым.</p>
              )}

              {alertExists && (
                <p style={{ color: 'red' }}>Такое название уже существует.</p>
              )}

              <button onClick={() => handeAddFav(item, favName)}>ОК</button>
            </div>
          </div>
        </Modal>
      )}

      <div className="history-wrapper">
        <div className="exit">
          {addedToFav ? (
            <button onClick={() => removeAdded(item)}>
              <AiFillStar />
            </button>
          ) : (
            <button onClick={() => handleInfoClick(id!, item)}>
              <AiOutlineStar />
            </button>
          )}

          <button>
            <GrFormClose onClick={() => removeHistory(id)} />
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

        <div className="info-time">
          <p>{formatedTime}</p>
          <p>{formatedDate}</p>
        </div>
      </div>
    </>
  )
}

export default SavedHistory
