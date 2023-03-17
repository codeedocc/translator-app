import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { languageSlice } from './language/language.slice'
import { countrySlice } from './country/country.slice'
import { languageApi } from './language/language.api'
import { modalSlice } from './modal/modal.slice'
import { countryApi } from './country/country.api'

const rootReducer = combineReducers({
  [countryApi.reducerPath]: countryApi.reducer,
  [languageApi.reducerPath]: languageApi.reducer,
  country: countrySlice.reducer,
  language: languageSlice.reducer,
  modal: modalSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(countryApi.middleware)
      .concat(languageApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
