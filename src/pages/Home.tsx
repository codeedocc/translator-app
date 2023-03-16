import { LanguagePick, TextInput } from '../components'

const Home: React.FC = () => {
  const ask = true
  const answer = true

  return (
    <div className="content">
      <LanguagePick />
      <TextInput ask={ask} />
      <TextInput answer={answer} />
    </div>
  )
}

export default Home
