import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  word: string
}

const initialState: IInitialState = {
  word: '',
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setWord: (state, action) => {
      state.word = action.payload
    },
  },
})

export const languageActions = languageSlice.actions
export const languageReducer = languageSlice.reducer
