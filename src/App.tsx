import { Navbar, Title } from './components'
import { Pages } from './pages'

const App: React.FC = () => {
  return (
    <div>
      <Title />
      <Pages />
      <Navbar />
    </div>
  )
}

export default App

// import { useEffect, useState } from 'react'

// const App = () => {
//   const [word, setWord] = useState('')
//   const [translatedWord, setTranslatedWord] = useState<any>('')
//   const [language, setLanguage] = useState({
//     from: 'ru',
//     to: 'en',
//   })

//   const getTranslate = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     const encodedParams = new URLSearchParams()
//     encodedParams.append('source_language', language.from)
//     encodedParams.append('target_language', language.to)
//     encodedParams.append('text', word)

//     const options = {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         'X-RapidAPI-Key': import.meta.env.VITE_TRANSLATOR_API_KEY,
//         'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
//       },
//       body: encodedParams,
//     }

//     await fetch('https://text-translator2.p.rapidapi.com/translate', options)
//       .then((response) => response.json())
//       .then((response) => setTranslatedWord(response.data.translatedText))
//       .catch((err) => console.error(err))
//   }

//   return (
//     <div>
//       <form onSubmit={(e) => getTranslate(e)}>
//         <input
//           type="text"
//           value={word}
//           onChange={(e) => setWord(e.target.value)}
//         />
//         <br />
//         <input type="text" value={translatedWord} />
//         <br />
//         <button type="submit">Перевести</button>
//       </form>
//     </div>
//   )
// }

// export default App
