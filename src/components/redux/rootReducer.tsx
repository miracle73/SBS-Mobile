import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice'
import adminReducer from './slices/adminSlice'
import userContentsReducer from './slices/userContentSlice'

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  admin: adminReducer,
  userContents: userContentsReducer,
  // Add other reducers here
})

export default rootReducer
