import { FavText, History } from '../../models/model'
import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  word: string
  copiedWord: string
  clearTranslation: boolean
  favText: FavText[]
  historyText: History[]
}

const initialState: IInitialState = {
  word: '',
  copiedWord: '',
  clearTranslation: false,
  favText: [],
  historyText: [],
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
  },
})

export const languageActions = languageSlice.actions
export const languageReducer = languageSlice.reducer
