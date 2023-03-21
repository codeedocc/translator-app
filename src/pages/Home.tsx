import {
  useGetLanguagesQuery,
  useGetTranslateMutation,
} from '../store/language/language.api'
import { useSearchCountriesQuery } from '../store/country/country.api'
import { LanguagePick, Modal, TextInput } from '../components'
import { useEffect, useRef } from 'react'
import { useAppSelector } from '../hooks/redux'
import { CountryList } from '../models/model'
import { useActions } from '../hooks/actions'

const Home: React.FC = () => {
  const { setWord, setClearTranslation } = useActions()
  const { isOpen } = useAppSelector((state) => state.modal)
  const { word } = useAppSelector((state) => state.language)
  const { chosenCountry } = useAppSelector((state) => state.country)

  const dataRef = useRef<CountryList[]>([])
  const availableLanguages = useRef<CountryList[]>([])

  const [getTranslation, { data: translatedWord }] = useGetTranslateMutation()
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

  useEffect(() => {
    getCountries()
  }, [countries])

  return (
    <div className="content">
      {isOpen && <Modal availableLanguages={availableLanguages.current} />}
      <LanguagePick />
      <TextInput getTranslate={getTranslate} word={word} setWord={setWord} />
      <TextInput translatedWord={translatedWord} />
    </div>
  )
}

export default Home
