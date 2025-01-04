// src/store/slices/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
}

interface CGPA {
  level: string;
  course: string;
  value: number;
}

interface UserState {
  idToken: string;
  user: User;
  cgpaRecords: CGPA[];
}

const initialState: UserState = {
  idToken: '',
  user: {
    id: '',
  },
  cgpaRecords: [],  // Ensure this is initialized as an empty array
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload, status: 'success' };
    },
    clearUserInfo: () => initialState,
    setCGPA: (state, action: PayloadAction<CGPA>) => {
      if (!state.cgpaRecords) {
        state.cgpaRecords = []; // Ensure cgpaRecords is defined
      }
      const index = state.cgpaRecords.findIndex(
        (record) => record.level === action.payload.level && record.course === action.payload.course
      );
      if (index >= 0) {
        state.cgpaRecords[index] = action.payload;
      } else {
        state.cgpaRecords.push(action.payload);
      }
    },
    clearCGPA: (state, action: PayloadAction<{ level: string; course: string }>) => {
      state.cgpaRecords = state.cgpaRecords.filter(
        (record) => record.level !== action.payload.level || record.course !== action.payload.course
      );
    },
  },
});

export const { setUserInfo, clearUserInfo, setCGPA, clearCGPA } = userSlice.actions;
export default userSlice.reducer;
