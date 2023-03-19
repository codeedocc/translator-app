import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  isOpen: boolean
}

const initialState: IInitialState = {
  isOpen: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload
    },
  },
})

export const modalActions = modalSlice.actions
export const modalReducer = modalSlice.reducer
