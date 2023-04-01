import { useAppSelector } from '../hooks/redux'
import { SavedHistory } from '../components'
import { historyPage } from '../assets/icons'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/actions'
import { useEffect } from 'react'

const History: React.FC = () => {
  const navigate = useNavigate()

  const { setHistoryText } = useActions()
  const { historyText } = useAppSelector((state) => state.language)

  const removeHistory = (id: number) => {
    setHistoryText(historyText.filter((el) => el.id !== id))
    localStorage.removeItem(`history - ${id}`)
  }

  useEffect(() => {
    const keys = Object.keys(localStorage)
    const historyKeys = keys.filter((el) => el.startsWith('his'))

    const data = historyKeys.map((key) =>
      JSON.parse(localStorage.getItem(key) || '[]')
    )

    const sortedData = data.sort((a, b) => a.id - b.id)
    setHistoryText(sortedData)
  }, [])

  return (
    <div className="info">
      {historyText.length === 0 && (
        <div className="info-empty">
          <button
            id="empty"
            style={{ display: 'none' }}
            onClick={() => navigate('/')}
          />

          <label htmlFor="empty">
            <img src={historyPage} alt="" />
          </label>

          <p>В истории пока ничего нет.</p>
        </div>
      )}

      {historyText.map((el) => {
        return (
          <SavedHistory
            key={el.id}
            word={el.word}
            translatedWord={el.translatedWord}
            from={el.from}
            to={el.to}
            id={el.id}
            removeHistory={removeHistory}
          />
        )
      })}
    </div>
  )
}

export default History
