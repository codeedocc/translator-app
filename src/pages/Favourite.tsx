import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/redux'
import { TranslatedText } from '../components'
import { useActions } from '../hooks/actions'

const Favourite: React.FC = () => {
  const [openModalId, setOpenModalId] = useState<number | null>(null)

  const { setFavText } = useActions()
  const { favText } = useAppSelector((state) => state.language)

  const handleInfoClick = (id: number) => {
    setOpenModalId(id)
  }

  const handleCloseModal = () => {
    setOpenModalId(null)
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
          />
        )
      })}
    </div>
  )
}

export default Favourite
