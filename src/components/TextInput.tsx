import { useEffect, useRef, useState } from 'react'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { copy, cross, favourite } from '../assets/icons'
import { TranslatedResponse } from '../models/model'
import { useAppSelector } from '../hooks/redux'
import toast, { Toaster } from 'react-hot-toast'
import { Loader, Modal } from './'
import { GrFormClose } from 'react-icons/gr'
import { useActions } from '../hooks/actions'

interface ITextInput {
  getTranslate?: () => void
  setWord?: ActionCreatorWithPayload<any, 'language/setWord'>
  translatedWord?: TranslatedResponse
  isLoading?: boolean
}

const TextInput: React.FC<ITextInput> = ({
  getTranslate,
  setWord,
  translatedWord,
  isLoading,
}) => {
  const [alertEmpty, setAlertEmpty] = useState<boolean>(false)
  const [alertExists, setAlertExists] = useState<boolean>(false)

  const textRef = useRef<HTMLTextAreaElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { setClearTranslation, setIsOpenAddFav, setFavName } = useActions()

  const { clearTranslation, word } = useAppSelector((state) => state.language)
  const { isOpenAddFav, favName } = useAppSelector((state) => state.modal)
  const { chosenCountry } = useAppSelector((state) => state.country)

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedWord!.data.translatedText)

    toast.success('Вы скопировали текст')
  }

  const handeAddFav = () => {
    const keys = Object.keys(localStorage)
    const keyExists = keys.find((el) => el === `favourite - ${favName}`)

    if (!keyExists && favName.trim() !== '') {
      const favourite = {
        title: favName,
        word: word,
        translatedWord: translatedWord?.data.translatedText,
        from: chosenCountry.from.value,
        to: chosenCountry.to.value,
        id: Date.now(),
        added: true,
      }

      localStorage.setItem(`favourite - ${favName}`, JSON.stringify(favourite))
      setFavName('')
      setIsOpenAddFav(false)

      toast('Добавлено в избранное', {
        duration: 2000,
        icon: '❤️',
      })

      return
    }

    if (favName.trim() === '') {
      setAlertEmpty(true)
      setAlertExists(false)
      return
    }

    setAlertEmpty(false)
    setAlertExists(true)
  }

  const openFavModal = () => {
    setFavName('')
    setAlertEmpty(false)
    setAlertExists(false)
    setIsOpenAddFav(true)
  }

  useEffect(() => {
    if (textRef.current !== null && word === '') {
      textRef.current.focus()
    }
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [isOpenAddFav])

  return (
    <>
      {isOpenAddFav && (
        <Modal>
          <div className="exit">
            <button onClick={() => setIsOpenAddFav(false)}>
              <GrFormClose />
            </button>
          </div>

          <div className="modal-sides">
            <div className="modal-title">
              <p>Как назвать?</p>
            </div>

            <div className="modal-input">
              <input
                type="text"
                ref={inputRef}
                value={favName}
                onChange={(e) => setFavName(e.target.value)}
              />
              {alertEmpty && (
                <p style={{ color: 'red' }}>Название не может быть пустым.</p>
              )}
              {alertExists && (
                <p style={{ color: 'red' }}>Такое название уже существует.</p>
              )}
              <button onClick={handeAddFav}>ОК</button>
            </div>
          </div>
        </Modal>
      )}
      {getTranslate ? (
        <div className="text-input">
          <div className="header">
            <span>
              <p>{chosenCountry.from.label}</p>
            </span>

            <img src={cross} alt="" onClick={() => setWord!('')} />
          </div>

          <div className="text">
            <textarea
              placeholder="Начните печатать..."
              value={word}
              onChange={(e) => setWord!(e.target.value)}
              ref={textRef}
            />
          </div>

          <div className="footer">
            {word && <button onClick={getTranslate}>Перевести</button>}
          </div>
        </div>
      ) : (
        <div className="text-input">
          <div className="header">
            <span>
              <p>{chosenCountry.to.label}</p>
            </span>

            <img src={cross} alt="" onClick={() => setClearTranslation(true)} />
          </div>

          <div className="text">
            {isLoading ? (
              <Loader />
            ) : !clearTranslation ? (
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
                  onClick={() => openFavModal()}
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
