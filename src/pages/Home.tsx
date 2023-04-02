import {
  useGetLanguagesQuery,
  useGetTranslateMutation,
} from '../store/language/language.api'
import { LanguagePick, Modal, TextInput } from '../components'
import { useSearchCountriesQuery } from '../store/country/country.api'
import { CountryList, History } from '../models/model'
import { useEffect, useRef } from 'react'
import { useAppSelector } from '../hooks/redux'
import { GrFormClose } from 'react-icons/gr'
import { useActions } from '../hooks/actions'
import { useState } from 'react'
import Select from 'react-select'

const Home: React.FC = () => {
  const [options, setOptions] = useState<CountryList[]>([])
  const [currentCountryFrom, setCurrentCountryFrom] = useState<string>('ru')
  const [currentCountryTo, setCurrentCountryTo] = useState<string>('en')

  const dataRef = useRef<CountryList[]>([])
  const availableLanguages = useRef<CountryList[]>([])

  const {
    setWord,
    setClearTranslation,
    setIsOpenLanguage,
    setChosenCountry,
    setHistoryText,
  } = useActions()

  const { chosenCountry } = useAppSelector((state) => state.country)
  const { isOpenLanguage } = useAppSelector((state) => state.modal)
  const { word, historyText } = useAppSelector((state) => state.language)

  const [getTranslation, { data: translatedWord, isLoading }] =
    useGetTranslateMutation()
  const { data: languages } = useGetLanguagesQuery('')
  const { data: countries } = useSearchCountriesQuery('')

  const getTranslate = async () => {
    try {
      setClearTranslation(false)

      await getTranslation({
        from: chosenCountry.from.value.toLowerCase(),
        to: chosenCountry.to.value.toLowerCase(),
        text: word,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const getCountries = () => {
    if (countries && languages) {
      const result: CountryList[] = [
        {
          value: 'en',
          label: 'Америка',
          flag: 'https://flagcdn.com/us.svg',
        },
      ]

      const abbreviation = countries?.map((el) =>
        el.altSpellings[0].toLowerCase()
      )

      const country = countries
        ?.map((el) => el.translations)
        .map((item) => item.rus.common)

      const flags = countries?.map((el) => el.flags[0])

      const countryList = abbreviation?.map((abbr, index) => ({
        value: abbr,
        label: country![index],
        flag: flags[index],
      }))

      dataRef.current = countryList

      const availableLanguageCode = languages?.data.languages.map(
        (el) => el.code
      )

      dataRef.current.find((el) => {
        const languages = availableLanguageCode.map((el) => el)

        for (let i = 0; i < languages.length; i++) {
          const language = languages[i]

          if (el.value === language) {
            result.push({
              value: el.value,
              label: el.label,
              flag: el.flag,
            })
          }
        }
      })

      availableLanguages.current = result
      setOptions(availableLanguages.current)
    }
  }

  const changeLanguage = (e: any) => {
    return {
      from() {
        setChosenCountry({
          ...chosenCountry,
          from: {
            ...chosenCountry.from,
            value: e.value,
            label: options.find((el) => el.label === e.label)?.label,
            flag: options.find((el) => el.value === e.value)?.flag,
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
            value: e.value,
            label: options.find((el) => el.label === e.label)?.label,
            flag: options.find((el) => el.value === e.value)?.flag,
          },
        })

        setClearTranslation(true)
      },
    }
  }

  const getValue = (side: string) => {
    if (side === 'from') {
      return currentCountryFrom
        ? options.find((el) => el.value === currentCountryFrom)
        : ''
    }

    if (side === 'to') {
      return currentCountryTo
        ? options.find((el) => el.value === currentCountryTo)
        : ''
    }
  }

  const onChangeSelect = (e: any, side: string) => {
    if (side === 'from') {
      setCurrentCountryFrom(e.value)
      changeLanguage(e).from()
      return
    }

    if (side === 'to') {
      setCurrentCountryTo(e.value)
      changeLanguage(e).to()
      return
    }
  }

  useEffect(() => {
    if (translatedWord?.data.translatedText) {
      const history: History = {
        word: word,
        translatedWord: translatedWord!.data.translatedText,
        from: chosenCountry.from.value.toLowerCase(),
        to: chosenCountry.to.value.toLowerCase(),
        id: Date.now(),
      }
      setHistoryText(historyText.concat(history))
      localStorage.setItem(`history - ${history.id}`, JSON.stringify(history))
    }
  }, [translatedWord])

  useEffect(() => {
    getCountries()
  }, [countries])

  return (
    <>
      {isOpenLanguage && (
        <Modal>
          <div className="exit">
            <button onClick={() => setIsOpenLanguage(false)}>
              <GrFormClose />
            </button>
          </div>

          <div className="modal-sides">
            <div className="modal-from">
              <p>С какого языка?</p>
              {options && (
                <Select
                  onChange={(e) => onChangeSelect(e, 'from')}
                  value={getValue('from')}
                  options={options}
                  className="select"
                />
              )}
            </div>

            <div className="modal-to">
              <p>На какой язык?</p>
              {options && (
                <Select
                  onChange={(e) => onChangeSelect(e, 'to')}
                  value={getValue('to')}
                  options={options}
                  className="select"
                />
              )}
            </div>
          </div>
        </Modal>
      )}

      <LanguagePick />
      <TextInput getTranslate={getTranslate} setWord={setWord} />
      <TextInput translatedWord={translatedWord} isLoading={isLoading} />
    </>
  )
}

export default Home
