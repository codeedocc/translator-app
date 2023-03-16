import { copy, cross, favourite, pronounce } from '../assets/icons'

interface ITextInput {
  ask?: boolean
  answer?: boolean
}

const TextInput: React.FC<ITextInput> = ({ ask, answer }) => {
  return (
    <div className="text-input">
      <div className="header">
        <span>
          {ask ? <p>English</p> : <p>Spanish</p>}

          <img src={pronounce} alt="" />
        </span>
        <img src={cross} alt="" />
      </div>
      <div className="text">
        {ask ? <p>How old are you?</p> : <p>Cuántos años tiene?</p>}
      </div>
      <div className="footer">
        {ask && <button>Перевести</button>}
        {answer && (
          <div>
            <button
              id="copying"
              style={{ display: 'none' }}
              onClick={() => console.log('ты кликнул на копи')}
            />
            <button
              id="fav"
              style={{ display: 'none' }}
              onClick={() => console.log('ты кликнул на fav')}
            />
            <label htmlFor="copying">
              <img src={copy} />
            </label>
            <label htmlFor="fav">
              <img src={favourite} />
            </label>
          </div>
        )}
      </div>
    </div>
  )
}

export default TextInput
