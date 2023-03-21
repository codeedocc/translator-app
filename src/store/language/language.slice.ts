import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  word: string
  copiedWord: string
  clearTranslation: boolean
}

const initialState: IInitialState = {
  word: '',
  copiedWord: '',
  clearTranslation: false,
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
  },
})

export const languageActions = languageSlice.actions
export const languageReducer = languageSlice.reducer
