import { FavouriteWrapper, HistoryWrapper, Home } from './'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'
import { useEffect } from 'react'

const Pages: React.FC = () => {
  const location = useLocation()

  const { setFavText, setHistoryText } = useActions()

  const { favText, historyText } = useAppSelector((state) => state.language)

  useEffect(() => {
    if (location.pathname !== '/translator-app/favourite') {
      setFavText(
        favText.filter((el) => {
          if (el.addedToFav === false) {
            localStorage.removeItem(`favourite - ${el.title}`)

            const historyItem = historyText.find((item) => item.id === el.id)

            if (historyItem) {
              localStorage.removeItem(`history - ${historyItem.id}`)

              localStorage.setItem(
                `history - ${historyItem.id}`,
                JSON.stringify({
                  ...historyItem,
                  addedToFav: false,
                })
              )

              setHistoryText(
                historyText.map((item) => {
                  if (item.id === el.id) {
                    return { ...item, addedToFav: false }
                  }
                  return item
                })
              )
            }
          }

          if (el.addedToFav === true) {
            return true
          }
        })
      )
    }
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/translator-app" element={<Home />} />
      <Route path="/translator-app/history" element={<HistoryWrapper />} />
      <Route path="/translator-app/favourite" element={<FavouriteWrapper />} />
    </Routes>
  )
}

export default Pages
