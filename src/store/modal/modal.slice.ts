import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  modal: boolean
}

const initialState: IInitialState = {
  modal: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload
    },
  },
})

export const modalActions = modalSlice.actions
export const modalReducer = modalSlice.reducer
