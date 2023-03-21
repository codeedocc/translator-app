import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'
import { changer } from '../assets/icons'
import { useEffect } from 'react'

const LanguagePick: React.FC = () => {
  const { setIsOpen, setChosenCountry } = useActions()
  const { isOpen } = useAppSelector((state) => state.modal)
  const { chosenCountry } = useAppSelector((state) => state.country)

  const switchLanguages = () => {
    setChosenCountry({
      ...chosenCountry,
      from: {
        ...chosenCountry.to,
      },
      to: {
        ...chosenCountry.from,
      },
    })
  }

  return (
    <div className="language">
      <span onClick={() => setIsOpen(!isOpen)}>
        <img src={chosenCountry.from.flag} alt="" />
        <p>{chosenCountry.from.country}</p>
      </span>
      <img
        src={changer}
        alt=""
        className="changer"
        onClick={() => switchLanguages()}
      />
      <span onClick={() => setIsOpen(!isOpen)}>
        <p>{chosenCountry.to.country}</p>
        <img src={chosenCountry.to.flag} alt="" />
      </span>
    </div>
  )
}

export default LanguagePick
