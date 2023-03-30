import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/redux'
import { TranslatedText } from '../components'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/actions'
import { emptyFav } from '../assets/icons'

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

  const removeFav = (title: string) => {
    const youSure = window.confirm('Удалить из избранного?')

    if (youSure) {
      setFavText(favText.filter((el) => el.title !== title))
      localStorage.removeItem(title)
    }
  }

  useEffect(() => {
    const keys = Object.keys(localStorage)
    const data = keys.map((key) =>
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
            onClick={() => navigate('/')}
          />
          <label htmlFor="empty">
            <img src={emptyFav} alt="" />
          </label>
          <p>В избранном ничего нет, добавьте что-нибудь.</p>
        </div>
      )}

      {favText.map((el) => {
        return (
          <TranslatedText
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
            removeFav={removeFav}
          />
        )
      })}
    </div>
  )
}

export default Favourite
