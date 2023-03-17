import { copy, cross, favourite, pronounce } from '../assets/icons'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useSearchCountriesQuery } from '../store/country/country.api'
import { TranslatedResponse } from '../models/model'
import { useState } from 'react'

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
  const [searching, setSearching] = useState(false)

  const { data } = useSearchCountriesQuery('', {
    skip: !searching,
  })

  return (
    <>
      {getTranslate ? (
        <div className="text-input">
          <div className="header">
            <span>
              <p>English</p>
              <img src={pronounce} alt="" />
            </span>
            <img src={cross} alt="" />
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
              <p>Spanish</p>
              <img src={pronounce} alt="" />
            </span>
            <img src={cross} alt="" />
          </div>
          <div className="text">
            <textarea
              placeholder="Здесь появится перевод..."
              value={translatedWord?.data.translatedText}
              disabled={true}
            />
          </div>
          <div className="footer">
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
          </div>
        </div>
      )}
    </>
  )
}

export default TextInput
