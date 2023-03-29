import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'
import { changer } from '../assets/icons'

const LanguagePick: React.FC = () => {
  const { setIsOpenLanguage, setChosenCountry } = useActions()
  const { isOpenLanguage } = useAppSelector((state) => state.modal)
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
      <span onClick={() => setIsOpenLanguage(!isOpenLanguage)}>
        <img src={chosenCountry.from.flag} alt="" />
        <p>{chosenCountry.from.label}</p>
      </span>

      <img
        src={changer}
        alt=""
        className="changer"
        onClick={() => switchLanguages()}
      />

      <span onClick={() => setIsOpenLanguage(!isOpenLanguage)}>
        <p>{chosenCountry.to.label}</p>
        <img src={chosenCountry.to.flag} alt="" />
      </span>
    </div>
  )
}

export default LanguagePick
