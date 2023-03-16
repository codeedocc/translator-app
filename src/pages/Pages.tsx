import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Favourite, History, Home } from './'

const Pages: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Pages
