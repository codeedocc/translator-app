import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  isOpenLanguage: boolean
  isOpenAddFav: boolean
  favName: string
  checkFav: boolean
}

const initialState: IInitialState = {
  isOpenLanguage: false,
  isOpenAddFav: false,
  favName: '',
  checkFav: false,
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
    closeAllModals: (state, action) => {
      state.isOpenLanguage = action.payload
      state.isOpenAddFav = action.payload
    },
    setFavName: (state, action) => {
      state.favName = action.payload
    },
    setCheckFav: (state, action) => {
      state.checkFav = action.payload
    },
  },
})

export const modalActions = modalSlice.actions
export const modalReducer = modalSlice.reducer
