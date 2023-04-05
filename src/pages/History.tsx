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
            onClick={() => navigate('/translator-app')}
          />

          <label htmlFor="empty">
            <img src={historyPage} alt="" />
          </label>

          <p>В истории пока ничего нет.</p>
        </div>
      )}

      {historyText.map((el) => {
        const timeZone = { timeZone: 'Europe/Moscow' }

        const date = new Date(el.id)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        const formatedDate = `${day}/${month}/${year}`
        const formatedTime = date.toLocaleTimeString('ru-RU', timeZone)

        return (
          <SavedHistory
            key={el.id}
            word={el.word}
            translatedWord={el.translatedWord}
            from={el.from}
            to={el.to}
            id={el.id}
            removeHistory={removeHistory}
            formatedDate={formatedDate}
            formatedTime={formatedTime}
          />
        )
      })}
    </div>
  )
}

export default History
