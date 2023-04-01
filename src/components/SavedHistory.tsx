import { GrFormClose } from 'react-icons/gr'

interface ISavedHistory {
  word: string
  translatedWord: string
  from: string
  to: string
  id: number
  removeHistory: (id: number) => void
}

const SavedHistory: React.FC<ISavedHistory> = ({
  word,
  translatedWord,
  from,
  to,
  id,
  removeHistory,
}) => {
  return (
    <div className="history-wrapper">
      <div className="exit">
        <button>
          <GrFormClose onClick={() => removeHistory(id)} />
        </button>
      </div>

      <div className="info-from">
        <span>
          <p>{from}</p>
          <p>{word}</p>
        </span>
      </div>

      <div className="line" />

      <div className="info-to">
        <span>
          <p>{to}</p>
          <p>{translatedWord}</p>
        </span>
      </div>
    </div>
  )
}

export default SavedHistory