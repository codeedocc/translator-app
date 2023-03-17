import { useNavigate } from 'react-router-dom'
import { logo } from '../assets/icons'

const Title: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="title">
      <div className="links">
        <img src={logo} alt="" />
        <button onClick={() => navigate('/')}>Переводчик</button>
      </div>
    </div>
  )
}

export default Title
