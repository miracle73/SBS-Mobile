// src/store/slices/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  username: string;
  courses: string[];  // Array type for courses
  id: string;
  name: string;
  picture: string | null; // Nullable string type for picture
  university: string;
  faculty: string;
  department: string;
  level: string;
}

interface UserState {
  idToken: string;
  scopes: string[];
  serverAuthCode: string;
  user: User;
  status: 'idle' | 'loading' | 'success' | 'error';
  darkMode: boolean; 
}

const initialState: UserState = {
  idToken: '',
  scopes: [],
  serverAuthCode: '',
  user: {
    email: '',
    username: '', // Ensure username field is present
    courses: [],  // Ensure courses is initialized as an empty array
    id: '',
    name: '',
    picture: "", // Ensure picture can be null
    university: '',
    faculty: '',
    department: '',
    level: ''
  },
  status: 'idle',
  darkMode: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload, status: 'success' };
    },
    setProfilePicture: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.picture = action.payload;
      }
    },
    clearUserInfo: () => initialState,
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode; 
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload; 
    }
  },
});

export const { setUserInfo, clearUserInfo, setProfilePicture, toggleDarkMode, setDarkMode } = userSlice.actions;
export default userSlice.reducer;
