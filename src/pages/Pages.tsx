import { Routes, Route } from 'react-router-dom'
import { Favourite, History, Home } from './'

const Pages: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
      <Route path="/favourite" element={<Favourite />} />
    </Routes>
  )
}

export default Pages
