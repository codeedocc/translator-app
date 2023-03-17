import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  word: string
  textFrom: string
  textTo: string
}

const initialState: IInitialState = {
  word: '',
  textFrom: 'ru',
  textTo: 'en',
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setWord: (state, action) => {
      state.word = action.payload
    },
    setTextFrom: (state, action) => {
      state.textFrom = action.payload
    },
    setTextTo: (state, action) => {
      state.textTo = action.payload
    },
  },
})

export const languageActions = languageSlice.actions
export const languageReducer = languageSlice.reducer
