import { Routes, Route, useLocation } from 'react-router-dom'
import { Favourite, History, Home } from './'
import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'
import { useEffect } from 'react'

const Pages: React.FC = () => {
  const location = useLocation()
  const { setFavText } = useActions()
  const { favText } = useAppSelector((state) => state.language)

  useEffect(() => {
    if (location.pathname !== '/translator-app/favourite') {
      setFavText(
        favText.filter((el) => {
          if (el.added === false) {
            localStorage.removeItem(`favourite - ${el.title}`)
          }

          if (el.added === true) {
            return true
          }
        })
      )
    }
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/translator-app" element={<Home />} />
      <Route path="/translator-app/history" element={<History />} />
      <Route path="/translator-app/favourite" element={<Favourite />} />
    </Routes>
  )
}

export default Pages
