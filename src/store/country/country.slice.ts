import { ChosenCountry } from '../../models/model'
import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  chosenCountry: ChosenCountry
}

const initialState: IInitialState = {
  chosenCountry: {
    from: {
      abbreviation: 'ru',
      country: 'Россия',
      flag: 'https://flagcdn.com/ru.svg',
    },
    to: {
      abbreviation: 'en',
      country: 'Америка',
      flag: 'https://flagcdn.com/us.svg',
    },
  },
}

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setChosenCountry: (state, action) => {
      state.chosenCountry = action.payload
    },
  },
})

export const countryActions = countrySlice.actions
export const countryReducer = countrySlice.reducer
