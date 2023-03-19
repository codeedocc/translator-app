import { useAppSelector } from '../hooks/redux'
import { GrFormClose } from 'react-icons/gr'
import { CountryList } from '../models/model'
import { useActions } from '../hooks/actions'

interface IModal {
  dataRef: CountryList[]
}

const Modal: React.FC<IModal> = ({ dataRef }) => {
  const { chosenCountry } = useAppSelector((state) => state.country)
  const { isOpen } = useAppSelector((state) => state.modal)
  const { setIsOpen, setChosenCountry } = useActions()

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
                setChosenCountry({ ...chosenCountry, from: e.target.value })
              }
            >
              {dataRef?.map((el) => (
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
                setChosenCountry({ ...chosenCountry, to: e.target.value })
              }
            >
              {dataRef.map((el) => (
                <option value={el.abbreviation} key={el.country}>
                  {el.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-buttons">
          <button>Применить</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
