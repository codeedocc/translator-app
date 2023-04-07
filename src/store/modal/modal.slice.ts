import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  isRemovingHistory: boolean
  isOpenLanguage: boolean
  isRemovingFav: boolean
  isOpenAddFav: boolean
  favName: string
}

const initialState: IInitialState = {
  isRemovingHistory: false,
  isOpenLanguage: false,
  isRemovingFav: false,
  isOpenAddFav: false,
  favName: '',
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsOpenLanguage: (state, action) => {
      state.isOpenLanguage = action.payload
    },
    setIsOpenAddFav: (state, action) => {
      state.isOpenAddFav = action.payload
    },
    setFavName: (state, action) => {
      state.favName = action.payload
    },
    setIsRemovingFav: (state, action) => {
      state.isRemovingFav = action.payload
    },
    setIsRemovingHistory: (state, action) => {
      state.isRemovingHistory = action.payload
    },
    closeAllModals: (state, action) => {
      state.isOpenLanguage = action.payload
      state.isOpenAddFav = action.payload
    },
  },
})

export const modalActions = modalSlice.actions
export const modalReducer = modalSlice.reducer
