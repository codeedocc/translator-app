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
  const { setWord } = useActions()
  const { isOpen } = useAppSelector((state) => state.modal)
  const { word } = useAppSelector((state) => state.language)
  const { chosenCountry } = useAppSelector((state) => state.country)

  const dataRef = useRef<CountryList[]>([])

  const [getTranslation, { data: translatedWord }] = useGetTranslateMutation()
  const { data: languages } = useGetLanguagesQuery('')
  const { data: countries } = useSearchCountriesQuery('')

  const getTranslate = async () => {
    try {
      await getTranslation({
        from: chosenCountry.from.toLowerCase(),
        to: chosenCountry.to.toLowerCase(),
        text: word,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const getCountries = () => {
    if (countries && languages) {
      const abbreviation = countries?.map((el) => el.altSpellings[0])

      const country = countries
        ?.map((el) => el.translations)
        .map((item) => item.rus.common)

      const countryList = abbreviation?.map((abbr, index) => ({
        abbreviation: abbr,
        country: country![index],
      }))

      dataRef.current = countryList

      // собираю доступные для перевода языки

      // const availableLanguage = languages?.data.languages.map((el) => el.name)

      // const countryLanguages = countries
      //   .map((el) => el.languages)
      //   .map((el) => Object.values(el))
      //   .flatMap((arr) => arr)
      //   .filter((el, index, self) => self.indexOf(el) === index)
      //   .sort()

      // const result = []
      // result.push(availableLanguage)
      // result.push(countryLanguages)

      // const done = result
      //   .flatMap((el) => el)
      //   .filter((el, index, self) => self.indexOf(el) === index)

      // console.log(done)
    }
  }

  useEffect(() => {
    getCountries()
  }, [countries])

  return (
    <div className="content">
      {isOpen && <Modal dataRef={dataRef.current} />}
      <LanguagePick />
      <TextInput getTranslate={getTranslate} word={word} setWord={setWord} />
      <TextInput translatedWord={translatedWord} />
    </div>
  )
}

export default Home
