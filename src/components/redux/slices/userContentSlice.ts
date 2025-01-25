import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentResponse } from '../../services/userService';

interface UserContentsState {
  contents: ContentResponse[];
}

const initialState: UserContentsState = {
  contents: [],
};

const userContentsSlice = createSlice({
  name: 'userContents',
  initialState,
  reducers: {
    setUserContents: (state, action: PayloadAction<ContentResponse[]>) => {
      state.contents = action.payload;
    },
  },
});

export const { setUserContents } = userContentsSlice.actions;
export default userContentsSlice.reducer;
