import { Favourite, History } from '../../models/model'
import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  clearTranslation: boolean
  currentHistory: History
  historyText: History[]
  copiedWord: string
  favText: Favourite[]
  word: string
}

const initialState: IInitialState = {
  clearTranslation: false,
  currentHistory: {
    word: '',
    translatedWord: '',
    from: '',
    to: '',
    id: 0,
    addedToFav: false,
    createdTime: 0,
  },
  historyText: [],
  copiedWord: '',
  favText: [],
  word: '',
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setWord: (state, action) => {
      state.word = action.payload
    },
    setCopiedWord: (state, action) => {
      state.copiedWord = action.payload
    },
    setClearTranslation: (state, action) => {
      state.clearTranslation = action.payload
    },
    setFavText: (state, action) => {
      state.favText = action.payload
    },
    setHistoryText: (state, action) => {
      state.historyText = action.payload
    },
    setCurrentHistory: (state, action) => {
      state.currentHistory = action.payload
    },
  },
})

export const languageActions = languageSlice.actions
export const languageReducer = languageSlice.reducer
