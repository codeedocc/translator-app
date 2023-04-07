import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/redux'
import { SavedHistory } from '../components'
import { historyPage } from '../assets/icons'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/actions'
import { History } from '../models/model'

const HistoryWrapper: React.FC = () => {
  const navigate = useNavigate()

  const [alertEmpty, setAlertEmpty] = useState<boolean>(false)
  const [alertExists, setAlertExists] = useState<boolean>(false)
  const [openModalId, setOpenModalId] = useState<number | null>(null)

  const { setHistoryText, setFavName, setCurrentHistory } = useActions()

  const { historyText, currentHistory } = useAppSelector(
    (state) => state.language
  )

  const handleInfoClick = (id: number, item: History) => {
    setOpenModalId(id)
    setCurrentHistory(item)
  }

  const handleCloseModal = () => {
    setOpenModalId(null)
  }

  const removeHistory = (id: number) => {
    setHistoryText(historyText.filter((el) => el.id !== id))
    localStorage.removeItem(`history - ${id}`)
  }

  const handeAddFav = (item: History, favName: string) => {
    const keys = Object.keys(localStorage)
    const keyExists = keys.find((el) => el === `favourite - ${favName}`)

    const historyKeys = keys.filter((el) => el.startsWith('his'))
    const data: History[] = historyKeys.map((key) =>
      JSON.parse(localStorage.getItem(key) || '[]')
    )

    if (!keyExists && favName.trim() !== '') {
      data.filter((el) => {
        if (el.id === item.id) {
          localStorage.removeItem(`history - ${item.id}`)
          return true
        }
      })

      const favourite = {
        title: favName,
        word: currentHistory.word,
        translatedWord: currentHistory.translatedWord,
        from: currentHistory.from,
        to: currentHistory.to,
        id: currentHistory.id,
        added: true,
      }

      setHistoryText(
        historyText.map((el) => {
          if (el.id === item.id) {
            return {
              ...el,
              added: !el.added,
            }
          }

          return el
        })
      )

      localStorage.setItem(`favourite - ${favName}`, JSON.stringify(favourite))
      localStorage.setItem(`history - ${item.id}`, JSON.stringify(favourite))

      setFavName('')
      setOpenModalId(null)
      return
    }

    if (favName.trim() === '') {
      setAlertEmpty(true)
      setAlertExists(false)
      return
    }

    setAlertEmpty(false)
    setAlertExists(true)
  }

  const removeAdded = (item: History) => {
    const keys = Object.keys(localStorage)
    const favouriteKeys = keys.filter((el) => el.startsWith('fav'))

    const data: History[] = favouriteKeys.map((key) =>
      JSON.parse(localStorage.getItem(key) || '[]')
    )

    data.filter((el) => {
      if (el.id === item.id) {
        localStorage.removeItem(`favourite - ${el.title}`)

        return true
      }
    })

    const updatedHistoryData = {
      ...item,
      added: false,
    }

    localStorage.removeItem(`history - ${item.id}`)
    localStorage.setItem(
      `history - ${item.id}`,
      JSON.stringify(updatedHistoryData)
    )

    const updatedHistoryText = historyText.map((el) => {
      if (el.id === item.id) {
        return updatedHistoryData
      }

      return el
    })

    setHistoryText(updatedHistoryText)
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
      {historyText?.length === 0 && (
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

      {historyText?.map((el) => {
        const timeZone = { timeZone: 'Europe/Moscow' }

        const date = new Date(el.id)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        const formatedDate = `${day}/${month}/${year}`
        const formatedTime = date.toLocaleTimeString('ru-RU', timeZone)

        return (
          <SavedHistory
            translatedWord={el.translatedWord}
            isOpenFav={openModalId === el.id}
            formatedDate={formatedDate}
            formatedTime={formatedTime}
            alertExists={alertExists}
            alertEmpty={alertEmpty}
            added={el.added}
            from={el.from}
            word={el.word}
            key={el.id}
            to={el.to}
            id={el.id}
            item={el}
            handleCloseModal={handleCloseModal}
            handleInfoClick={handleInfoClick}
            removeHistory={removeHistory}
            handeAddFav={handeAddFav}
            removeAdded={removeAdded}
          />
        )
      })}
    </div>
  )
}

export default HistoryWrapper
