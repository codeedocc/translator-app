import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { GrFormClose } from 'react-icons/gr'
import { useActions } from '../hooks/actions'
import { Modal } from './'
import { logo } from '../assets/icons'

const Title: React.FC = () => {
  const { setFavText, setIsRemovingFav } = useActions()
  const { favText } = useAppSelector((state) => state.language)
  const { isRemovingFav } = useAppSelector((state) => state.modal)

  const navigate = useNavigate()
  const location = useLocation()

  const checkStorage = () => {
    if (location.pathname === '/favourite' && favText.length) {
      return true
    }

    return false
  }

  const storageRemover = () => {
    localStorage.clear()
    setFavText([])
    setIsRemovingFav(false)
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
                Всего заметок: <strong>{favText.length}</strong>.
              </p>
              <p>Вы точно хотите всё удалить?</p>
            </div>

            <div className="modal-input">
              <button className="exit" onClick={() => setIsRemovingFav(false)}>
                Отменить
              </button>

              <button onClick={() => storageRemover()}>Удалить</button>
            </div>
          </div>
        </Modal>
      )}

      <div className="title">
        <div className="links">
          <img src={logo} alt="" />
          <button onClick={() => navigate('/')}>Переводчик</button>
        </div>

        {checkStorage() && (
          <div className="links">
            <button
              className="remove-fav"
              onClick={() => setIsRemovingFav(true)}
            >
              Удалить всё
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Title
