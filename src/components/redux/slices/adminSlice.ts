// src/store/slices/adminSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Admin {
  email: string;
  id: string;
  is_active: boolean;
  admin_role: boolean;
  secret: string;  // Add the secret field
}

interface AdminState {
  admin: Admin;
  status: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: AdminState = {
  admin: {
    email: '',
    id: '',
    is_active: false,
    admin_role: false,
    secret: '',  
  },
  status: 'idle',
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminInfo: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
      state.status = 'success';
    },
    clearAdminInfo: () => initialState,
  },
});

export const { setAdminInfo, clearAdminInfo } = adminSlice.actions;
export default adminSlice.reducer;
