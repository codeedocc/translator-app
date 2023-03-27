import { Navbar, Title } from './components'
import { Pages } from './pages'

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Title />

      <div className="content">
        <Pages />
      </div>

      <Navbar />
    </div>
  )
}

export default App
