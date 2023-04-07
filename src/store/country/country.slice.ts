import { ChosenCountry } from '../../models/model'
import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  chosenCountry: ChosenCountry
}

const storedCountryFrom = JSON.parse(
  localStorage.getItem('selectedCountryFrom') || '[]'
)

const storedCountryTo = JSON.parse(
  localStorage.getItem('selectedCountryTo') || '[]'
)

const initialState: IInitialState = {
  chosenCountry: {
    from: Object.keys(storedCountryFrom).length
      ? {
          value: storedCountryFrom.value,
          label: storedCountryFrom.label,
          flag: storedCountryFrom.flag,
        }
      : {
          value: 'ru',
          label: 'Россия',
          flag: 'https://flagcdn.com/ru.svg',
        },
    to: Object.keys(storedCountryTo).length
      ? {
          value: storedCountryTo.value,
          label: storedCountryTo.label,
          flag: storedCountryTo.flag,
        }
      : {
          value: 'en',
          label: 'Америка',
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
