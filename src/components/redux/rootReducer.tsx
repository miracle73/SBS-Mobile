import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice'
import adminReducer from './slices/adminSlice'

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  admin: adminReducer,
  // Add other reducers here
})

export default rootReducer
