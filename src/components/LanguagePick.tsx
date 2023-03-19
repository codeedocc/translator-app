import { changer, english, spanish } from '../assets/icons'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'

const LanguagePick: React.FC = () => {
  const { isOpen } = useAppSelector((state) => state.modal)
  const { setIsOpen } = useActions()

  return (
    <div className="language">
      <span onClick={() => setIsOpen(!isOpen)}>
        <img src={english} alt="" />
        <p>English</p>
      </span>
      <img src={changer} alt="" className="changer" />
      <span onClick={() => setIsOpen(!isOpen)}>
        <p>Spanish</p>
        <img src={spanish} alt="" />
      </span>
    </div>
  )
}

export default LanguagePick
