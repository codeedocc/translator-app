import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'
import { changer } from '../assets/icons'

const LanguagePick: React.FC = () => {
  const { setIsOpen } = useActions()
  const { isOpen } = useAppSelector((state) => state.modal)
  const { chosenCountry } = useAppSelector((state) => state.country)

  return (
    <div className="language">
      <span onClick={() => setIsOpen(!isOpen)}>
        <img src={chosenCountry.from.flag} alt="" />
        <p>{chosenCountry.from.country}</p>
      </span>
      <img src={changer} alt="" className="changer" />
      <span onClick={() => setIsOpen(!isOpen)}>
        <p>{chosenCountry.to.country}</p>
        <img src={chosenCountry.to.flag} alt="" />
      </span>
    </div>
  )
}

export default LanguagePick
