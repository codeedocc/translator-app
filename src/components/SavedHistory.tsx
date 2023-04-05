import { GrFormClose } from 'react-icons/gr'

interface ISavedHistory {
  word: string
  translatedWord: string
  from: string
  to: string
  id: number
  removeHistory: (id: number) => void
  formatedDate: string
  formatedTime: string
}

const SavedHistory: React.FC<ISavedHistory> = ({
  word,
  translatedWord,
  from,
  to,
  id,
  removeHistory,
  formatedDate,
  formatedTime,
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
      <div className="info-time">
        <p>{formatedTime}</p>
        <p>{formatedDate}</p>
      </div>
    </div>
  )
}

export default SavedHistory
