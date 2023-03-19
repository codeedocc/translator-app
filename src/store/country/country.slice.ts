import { ChosenCountry } from '../../models/model'
import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  chosenCountry: ChosenCountry
}

const initialState: IInitialState = {
  chosenCountry: {
    from: '',
    to: '',
  },
}

export const countrySlice = createSlice({
  name: 'contry',
  initialState,
  reducers: {
    setChosenCountry: (state, action) => {
      state.chosenCountry = action.payload
    },
  },
})

export const countryActions = countrySlice.actions
export const countryReducer = countrySlice.reducer
