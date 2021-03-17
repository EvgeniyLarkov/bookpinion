import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalVariants } from './types';

export enum ModalStates {
  'closed',
  'open',
}

interface UpdateBookDataInterface {
  id: string;
}

export interface ModalData {
  variant: ModalVariants | null
  label: string
  data?: null | UpdateBookDataInterface
}

export interface ModalInterface extends ModalData {
  state: ModalStates
}

const initialState: ModalInterface = {
  state: ModalStates.closed,
  variant: null,
  label: '',
  data: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open(state, action: PayloadAction<ModalData>) {
      state.state = ModalStates.open;
      state.variant = action.payload.variant;
      state.label = action.payload.label;
      if (action.payload.data) {
        state.data = action.payload.data;
      }
    },
    close(state) {
      state.state = ModalStates.closed;
      state.variant = null;
      state.label = '';
      state.data = null;
    },
  },
});

export const { open: openModal, close: closeModal } = modalSlice.actions;

export default modalSlice.reducer;
