import { useGetTranslateMutation } from '../store/language/language.api'
import { LanguagePick, TextInput } from '../components'
import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'

const Home: React.FC = () => {
  const { word, textFrom, textTo } = useAppSelector((state) => state.language)
  const { setWord } = useActions()

  const [getTranslation, { isLoading, isError, data: translatedWord }] =
    useGetTranslateMutation()

  const getTranslate = async () => {
    try {
      await getTranslation({
        from: textFrom,
        to: textTo,
        text: word,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="content">
      <LanguagePick />
      <TextInput getTranslate={getTranslate} word={word} setWord={setWord} />
      <TextInput translatedWord={translatedWord} />
    </div>
  )
}

export default Home
