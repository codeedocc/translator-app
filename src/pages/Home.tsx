import {
  useGetLanguagesQuery,
  useGetTranslateMutation,
} from '../store/language/language.api'
import { LanguagePick, Modal, TextInput } from '../components'
import { useSearchCountriesQuery } from '../store/country/country.api'
import { useEffect, useRef } from 'react'
import { useAppSelector } from '../hooks/redux'
import { GrFormClose } from 'react-icons/gr'
import { CountryList } from '../models/model'
import { useActions } from '../hooks/actions'

const Home: React.FC = () => {
  const { setWord, setClearTranslation, setIsOpenLanguage, setChosenCountry } =
    useActions()

  const { chosenCountry } = useAppSelector((state) => state.country)
  const { isOpenLanguage } = useAppSelector((state) => state.modal)
  const { word } = useAppSelector((state) => state.language)

  const dataRef = useRef<CountryList[]>([])
  const availableLanguages = useRef<CountryList[]>([])

  const [getTranslation, { data: translatedWord, isLoading }] =
    useGetTranslateMutation()
  const { data: languages } = useGetLanguagesQuery('')
  const { data: countries } = useSearchCountriesQuery('')

  const getTranslate = async () => {
    try {
      setClearTranslation(false)

      await getTranslation({
        from: chosenCountry.from.abbreviation.toLowerCase(),
        to: chosenCountry.to.abbreviation.toLowerCase(),
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
          abbreviation: 'en',
          country: 'Америка',
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
        abbreviation: abbr,
        country: country![index],
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

          if (el.abbreviation === language) {
            result.push({
              abbreviation: el.abbreviation,
              country: el.country,
              flag: el.flag,
            })
          }
        }
      })

      availableLanguages.current = result
    }
  }

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    return {
      from() {
        setChosenCountry({
          ...chosenCountry,
          from: {
            ...chosenCountry.from,
            abbreviation: e.target.value,
            country: availableLanguages.current.find(
              (el) => el.abbreviation === e.target.value
            )?.country,
            flag: availableLanguages.current.find(
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
            country: availableLanguages.current.find(
              (el) => el.abbreviation === e.target.value
            )?.country,
            flag: availableLanguages.current.find(
              (el) => el.abbreviation === e.target.value
            )?.flag,
          },
        })

        setClearTranslation(true)
      },
    }
  }

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
              <select onChange={(e) => changeLanguage(e).from()}>
                {availableLanguages?.current.map((el) => (
                  <option value={el.abbreviation} key={el.country}>
                    {el.country}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-to">
              <p>На какой язык?</p>
              <select onChange={(e) => changeLanguage(e).to()}>
                {availableLanguages?.current.map((el) => (
                  <option value={el.abbreviation} key={el.country}>
                    {el.country}
                  </option>
                ))}
              </select>
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
