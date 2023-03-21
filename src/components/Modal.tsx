import { useAppSelector } from '../hooks/redux'
import { CountryList } from '../models/model'
import { GrFormClose } from 'react-icons/gr'
import { useActions } from '../hooks/actions'

interface IModal {
  availableLanguages: CountryList[]
}

const Modal: React.FC<IModal> = ({ availableLanguages }) => {
  const { setIsOpen, setChosenCountry } = useActions()
  const { isOpen } = useAppSelector((state) => state.modal)
  const { chosenCountry } = useAppSelector((state) => state.country)

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
            <select
              onChange={(e) =>
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
              }
            >
              {availableLanguages?.map((el) => (
                <option value={el.abbreviation} key={el.country}>
                  {el.country}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-to">
            <p>На какой язык?</p>
            <select
              onChange={(e) =>
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
              }
            >
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
