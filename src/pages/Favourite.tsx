import { TranslatedText } from '../components'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { useEffect } from 'react'

const Favourite: React.FC = () => {
  const { setFavText } = useActions()
  const { favText } = useAppSelector((state) => state.language)

  useEffect(() => {
    const keys = Object.keys(localStorage)
    const data = keys.map((key) =>
      JSON.parse(localStorage.getItem(key) || '[]')
    )

    setFavText(data)
  }, [])

  return (
    <div className="info">
      {favText.map((el) => (
        <TranslatedText
          title={el.title}
          from={el.from}
          to={el.to}
          word={el.word}
          translatedWord={el.translatedWord}
          key={el.id}
        />
      ))}
    </div>
  )
}

export default Favourite
