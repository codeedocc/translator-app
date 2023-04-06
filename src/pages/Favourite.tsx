import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/actions'
import { emptyFav } from '../assets/icons'
import { SavedFav } from '../components'

const Favourite: React.FC = () => {
  const navigate = useNavigate()

  const [openModalId, setOpenModalId] = useState<number | null>(null)

  const { setFavText } = useActions()

  const { favText } = useAppSelector((state) => state.language)

  const handleInfoClick = (id: number) => {
    setOpenModalId(id)
  }

  const handleCloseModal = () => {
    setOpenModalId(null)
  }

  const changeAdded = (title: string) => {
    setFavText(
      favText.map((el) => {
        if (el.title === title) {
          return {
            ...el,
            added: !el.added,
          }
        }

        return el
      })
    )
  }

  useEffect(() => {
    const keys = Object.keys(localStorage)
    const favKeys = keys.filter((el) => el.startsWith('fav'))

    const data = favKeys.map((key) =>
      JSON.parse(localStorage.getItem(key) || '[]')
    )

    const sortedData = data.sort((a, b) => a.id - b.id)
    setFavText(sortedData)
  }, [])

  return (
    <div className="info">
      {favText.length === 0 && (
        <div className="info-empty">
          <button
            id="empty"
            style={{ display: 'none' }}
            onClick={() => navigate('/translator-app')}
          />

          <label htmlFor="empty">
            <img src={emptyFav} alt="" />
          </label>

          <p>В избранном ничего нет, добавьте что-нибудь.</p>
        </div>
      )}

      {favText.map((el) => {
        return (
          <SavedFav
            title={el.title}
            from={el.from}
            to={el.to}
            word={el.word}
            translatedWord={el.translatedWord}
            id={el.id}
            key={el.id}
            handleInfoClick={handleInfoClick}
            handleCloseModal={handleCloseModal}
            isOpenFav={openModalId === el.id}
            changeAdded={changeAdded}
            added={el.added}
          />
        )
      })}
    </div>
  )
}

export default Favourite
