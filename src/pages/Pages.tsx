import { Favourite, History, Home } from './'
import { Routes, Route } from 'react-router-dom'

const Pages: React.FC = () => {
  return (
    <Routes>
      <Route path="/translator-app" element={<Home />} />
      <Route path="/translator-app/history" element={<History />} />
      <Route path="/translator-app/favourite" element={<Favourite />} />
    </Routes>
  )
}

export default Pages
