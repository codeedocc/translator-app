import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  modal: boolean
  isSearching: boolean
}

const initialState: IInitialState = {
  modal: true,
  isSearching: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload
    },
  },
})

export const modalActions = modalSlice.actions
export const modalReducer = modalSlice.reducer
