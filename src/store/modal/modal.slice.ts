import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  isOpenLanguage: boolean
  isOpenAddFav: boolean
  favName: string
  isRemovingFav: boolean
}

const initialState: IInitialState = {
  isOpenLanguage: false,
  isOpenAddFav: false,
  favName: '',
  isRemovingFav: false,
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
    closeAllModals: (state, action) => {
      state.isOpenLanguage = action.payload
      state.isOpenAddFav = action.payload
    },
  },
})

export const modalActions = modalSlice.actions
export const modalReducer = modalSlice.reducer
