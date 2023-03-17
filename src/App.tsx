import { Navbar, Title } from './components'
import { Pages } from './pages'

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Title />
      <Pages />
      <Navbar />
    </div>
  )
}

export default App
