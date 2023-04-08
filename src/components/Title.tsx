import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { GrFormClose } from 'react-icons/gr'
import { useActions } from '../hooks/actions'
import { Modal } from './'
import { logo } from '../assets/icons'

const Title: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { setFavText, setIsRemovingFav, setHistoryText, setIsRemovingHistory } =
    useActions()

  const { favText, historyText } = useAppSelector((state) => state.language)
  const { isRemovingFav, isRemovingHistory } = useAppSelector(
    (state) => state.modal
  )

  const checkStorageFavourite = () => {
    if (location.pathname === '/translator-app/favourite' && favText?.length) {
      return true
    }

    return false
  }

  const checkStorageHistory = () => {
    if (
      location.pathname === '/translator-app/history' &&
      historyText?.length
    ) {
      return true
    }

    return false
  }

  const favouriteRemover = () => {
    const keys = Object.keys(localStorage)

    keys.forEach((key) => {
      if (key.startsWith('favourite')) {
        localStorage.removeItem(key)
      }
    })

    const historyKeys = keys.filter((el) => el.startsWith('history'))

    const updatedHistoryText = historyKeys.map((key) => {
      const historyItem = JSON.parse(localStorage.getItem(key) || '[]')

      if (historyItem.addedToFav) {
        const updatedHistoryItem = { ...historyItem, addedToFav: false }

        localStorage.setItem(key, JSON.stringify(updatedHistoryItem))
        return updatedHistoryItem
      } else {
        return historyItem
      }
    })

    setFavText([])
    setIsRemovingFav(false)
    setHistoryText(updatedHistoryText)
  }

  const historyRemover = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('history')) {
        localStorage.removeItem(key)
      }
    })

    setHistoryText([])
    setIsRemovingHistory(false)
  }

  return (
    <>
      {isRemovingFav && (
        <Modal>
          <div className="exit">
            <button onClick={() => setIsRemovingFav(false)}>
              <GrFormClose />
            </button>
          </div>

          <div className="modal-sides">
            <div className="modal-title">
              <p>
                Всего элементов: <strong>{favText.length}</strong>.
              </p>
              <p>Вы точно хотите всё удалить?</p>
            </div>

            <div className="modal-input">
              <button className="exit" onClick={() => setIsRemovingFav(false)}>
                Отменить
              </button>

              <button onClick={() => favouriteRemover()}>Удалить</button>
            </div>
          </div>
        </Modal>
      )}

      {isRemovingHistory && (
        <Modal>
          <div className="exit">
            <button onClick={() => setIsRemovingHistory(false)}>
              <GrFormClose />
            </button>
          </div>

          <div className="modal-sides">
            <div className="modal-title">
              <p>
                Всего элементов: <strong>{historyText.length}</strong>.
              </p>
              <p>Вы точно хотите очистить историю?</p>
            </div>

            <div className="modal-input">
              <button
                className="exit"
                onClick={() => setIsRemovingHistory(false)}
              >
                Отменить
              </button>

              <button onClick={() => historyRemover()}>Очистить</button>
            </div>
          </div>
        </Modal>
      )}

      <div className="title">
        <div className="links" onClick={() => navigate('/translator-app')}>
          <img src={logo} alt="" />
          <button>Переводчик</button>
        </div>

        {checkStorageFavourite() && (
          <div className="links">
            <button
              className="remove-fav"
              onClick={() => setIsRemovingFav(true)}
            >
              Удалить всё
            </button>
          </div>
        )}

        {checkStorageHistory() && (
          <div className="links">
            <button
              className="remove-fav"
              onClick={() => setIsRemovingHistory(true)}
            >
              Очистить историю
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Title
