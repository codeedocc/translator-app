import { useNavigate } from 'react-router-dom'
import { logo } from '../assets/icons'

const Title: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="title">
      <img src={logo} alt="" />
      <button onClick={() => navigate('/')}>Переводчик</button>
    </div>
  )
}

export default Title
