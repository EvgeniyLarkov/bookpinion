import { createSlice } from '@reduxjs/toolkit';

export enum ModalStates {
  'closed',
  'open',
}

export interface ModalInterface {
  state: ModalStates
}

const initialState: ModalInterface = {
  state: ModalStates.closed,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open(state) {
      state.state = ModalStates.open;
    },
    close(state) {
      state.state = ModalStates.closed;
    },
  },
});

export const { open: openModal, close: closeModal } = modalSlice.actions;

export default modalSlice.reducer;
