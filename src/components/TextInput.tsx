import { copy, cross, favourite, pronounce } from '../assets/icons'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { TranslatedResponse } from '../models/model'
import { useAppSelector } from '../hooks/redux'
import toast, { Toaster } from 'react-hot-toast'
import { useActions } from '../hooks/actions'
import { useEffect } from 'react'

interface ITextInput {
  getTranslate?: () => void
  word?: string
  setWord?: ActionCreatorWithPayload<any, 'language/setWord'>
  translatedWord?: TranslatedResponse
}

const TextInput: React.FC<ITextInput> = ({
  getTranslate,
  word,
  setWord,
  translatedWord,
}) => {
  const { setClearTranslation } = useActions()
  const { chosenCountry } = useAppSelector((state) => state.country)
  const { clearTranslation } = useAppSelector((state) => state.language)

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedWord!.data.translatedText)

    toast.success('Вы скопировали текст.')
  }

  return (
    <>
      {getTranslate ? (
        <div className="text-input">
          <div className="header">
            <span>
              <p>{chosenCountry.from.country}</p>
              <img src={pronounce} alt="" />
            </span>
            <img src={cross} alt="" onClick={() => setWord!('')} />
          </div>
          <div className="text">
            <textarea
              placeholder="Начните печатать..."
              value={word}
              onChange={(e) => setWord!(e.target.value)}
            />
          </div>
          <div className="footer">
            <button onClick={getTranslate}>Перевести</button>
          </div>
        </div>
      ) : (
        <div className="text-input">
          <div className="header">
            <span>
              <p>{chosenCountry.to.country}</p>
              <img src={pronounce} alt="" />
            </span>
            <img
              src={cross}
              alt=""
              onClick={() => setClearTranslation(!clearTranslation)}
            />
          </div>
          <div className="text">
            {!clearTranslation ? (
              <textarea
                placeholder="Здесь появится перевод..."
                value={translatedWord?.data.translatedText}
                disabled={true}
              />
            ) : (
              <textarea
                placeholder="Здесь появится перевод..."
                value={''}
                disabled={true}
              />
            )}
          </div>
          <div className="footer">
            {translatedWord?.data.translatedText && (
              <div>
                <button
                  id="copying"
                  style={{ display: 'none' }}
                  onClick={() => handleCopy()}
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
          <div className="toaster">
            <Toaster
              containerStyle={{
                position: 'relative',
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default TextInput
