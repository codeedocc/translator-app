import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  countryFrom: string
  countryTo: string
}

const initialState: IInitialState = {
  countryFrom: '',
  countryTo: '',
}

export const countrySlice = createSlice({
  name: 'contry',
  initialState,
  reducers: {
    setCountryFrom: (state, action) => {
      state.countryFrom = action.payload
    },
    setCountryTo: (state, action) => {
      state.countryFrom = action.payload
    },
  },
})

export const countryActions = countrySlice.actions
export const countryReducer = countrySlice.reducer
