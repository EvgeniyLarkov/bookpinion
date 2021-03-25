import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { publishArticle } from './articles';
import { NotificationsInterface, NotificationStates, NotificationIds } from './types';

const initialState: NotificationsInterface = {
  state: NotificationStates.idle,
  data: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    remove(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const index = state.data.findIndex((data) => data.id === id);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
      if (state.data.length === 0) {
        state.state = NotificationStates.idle;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(publishArticle.fulfilled, (state, { payload }) => {
      state.data.push({ id: payload.message.bookId, msg: NotificationIds.articleAdded });
      state.state = NotificationStates.full;
    });
  },
});

export const { remove: removeNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
