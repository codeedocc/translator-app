import { useAppSelector } from '../hooks/redux'
import { CountryList } from '../models/model'
import { GrFormClose } from 'react-icons/gr'
import { useActions } from '../hooks/actions'

interface IModal {
  availableLanguages: CountryList[]
}

const Modal: React.FC<IModal> = ({ availableLanguages }) => {
  const { setIsOpen, setChosenCountry, setWord, setClearTranslation } =
    useActions()
  const { isOpen } = useAppSelector((state) => state.modal)
  const { chosenCountry } = useAppSelector((state) => state.country)

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    return {
      from() {
        setChosenCountry({
          ...chosenCountry,
          from: {
            ...chosenCountry.from,
            abbreviation: e.target.value,
            country: availableLanguages.find(
              (el) => el.abbreviation === e.target.value
            )?.country,
            flag: availableLanguages.find(
              (el) => el.abbreviation === e.target.value
            )?.flag,
          },
        })

        setWord('')
        setClearTranslation(true)
      },
      to() {
        setChosenCountry({
          ...chosenCountry,
          to: {
            ...chosenCountry.to,
            abbreviation: e.target.value,
            country: availableLanguages.find(
              (el) => el.abbreviation === e.target.value
            )?.country,
            flag: availableLanguages.find(
              (el) => el.abbreviation === e.target.value
            )?.flag,
          },
        })

        setClearTranslation(true)
      },
    }
  }

  return (
    <div
      className={isOpen ? 'modal-wrapper open' : 'modal-wrapper'}
      onClick={() => setIsOpen(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="exit">
          <button onClick={() => setIsOpen(false)}>
            <GrFormClose />
          </button>
        </div>
        <div className="modal-sides">
          <div className="modal-from">
            <p>С какого языка?</p>
            <select onChange={(e) => changeLanguage(e).from()}>
              {availableLanguages?.map((el) => (
                <option value={el.abbreviation} key={el.country}>
                  {el.country}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-to">
            <p>На какой язык?</p>
            <select onChange={(e) => changeLanguage(e).to()}>
              {availableLanguages.map((el) => (
                <option value={el.abbreviation} key={el.country}>
                  {el.country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
