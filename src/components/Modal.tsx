import { useSearchCountriesQuery } from '../store/country/country.api'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'
import Select from 'react-select'

const Modal = () => {
  const { isSearching } = useAppSelector((state) => state.modal)
  const { setIsSearching } = useActions()
  const [country, setCountry] = useState<string[] | undefined>([])

  const { data } = useSearchCountriesQuery('', {
    skip: isSearching,
  })

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  useEffect(() => {
    const check = data?.map((el) => el.translations)
    const result = check?.map((item) => item.rus.common)
    setCountry(result)
  }, [])

  return (
    <div className="modal">
      <div className="modal-sides">
        <div className="modal-from">
          <p>С какого языка?</p>
          <Select options={options} placeholder="Выбрать..." />
        </div>
        <div className="modal-to">
          <p>На какой язык?</p>
          <Select options={options} placeholder="Выбрать..." />
        </div>
      </div>

      <div className="modal-buttons">
        <button>Применить</button>
      </div>
    </div>
  )
}

export default Modal
