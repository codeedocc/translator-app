import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/actions'
import { emptyFav } from '../assets/icons'
import { SavedFav } from '../components'

const FavouriteWrapper: React.FC = () => {
  const navigate = useNavigate()

  const [openModalId, setOpenModalId] = useState<string | null>(null)

  const { setFavText } = useActions()

  const { favText } = useAppSelector((state) => state.language)

  const handleInfoClick = (id: string) => {
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
            addedToFav: !el.addedToFav,
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

    const sortedData = data.sort((a, b) => a.addedToFavTime - b.addedToFavTime)
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
            translatedWord={el.translatedWord}
            addedToFavTime={el.addedToFavTime}
            isOpenFav={openModalId === el.id}
            addedToFav={el.addedToFav}
            title={el.title}
            from={el.from}
            word={el.word}
            key={el.id}
            id={el.id}
            to={el.to}
            handleCloseModal={handleCloseModal}
            handleInfoClick={handleInfoClick}
            changeAdded={changeAdded}
          />
        )
      })}
    </div>
  )
}

export default FavouriteWrapper
