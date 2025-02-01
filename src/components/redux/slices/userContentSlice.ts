import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { ContentResponse } from '../../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

// Thunk action to set contents and store in AsyncStorage
export const setUserContentsWithStorage = (contents: ContentResponse[]) => async (dispatch: Dispatch) => {
  dispatch(setUserContents(contents));
  await AsyncStorage.setItem('userContents', JSON.stringify(contents));
};

// Thunk to fetch contents from AsyncStorage
export const fetchStoredContents = () => async (dispatch: Dispatch) => {
  const storedContents = await AsyncStorage.getItem('userContents');
  if (storedContents) {
    dispatch(setUserContents(JSON.parse(storedContents)));
  }
};

export const { setUserContents } = userContentsSlice.actions;
export default userContentsSlice.reducer;
