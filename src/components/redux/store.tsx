import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import userReducer from './slices/userSlice'
import { userApi } from '../services/userService'
// import { tutorauthApi } from '../services/tutorauthApi'
// import { studentauthApi } from '../services/studentauthApi'
// import { logoutUser } from './slices/authSlice'
// import { locationApi } from '../services/locationService'
// import { materialApi } from '../services/materialService'
// import { profileApi } from '../services/profileService'
// import { projectServiceApi } from '../services/projectService'
// import { scheduleServiceApi } from '../services/scheduleService'


const rootReducer = combineReducers({
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer,
//   [studentauthApi.reducerPath]: studentauthApi.reducer,
//   [locationApi.reducerPath]: locationApi.reducer,
//   [materialApi.reducerPath]: materialApi.reducer,
//   [profileApi.reducerPath]: profileApi.reducer,
//   [projectServiceApi.reducerPath]: projectServiceApi.reducer,
//   [scheduleServiceApi.reducerPath]: scheduleServiceApi.reducer,
})


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'], 
  version: 1 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // ignoredPaths: [tutorauthApi.reducerPath, studentauthApi.reducerPath]
      }
    })
    .concat(
        userApi.middleware,
    //      studentauthApi.middleware,
    //       locationApi.middleware,
    //        materialApi.middleware,
    //   profileApi.middleware,
    //   projectServiceApi.middleware,
    //    scheduleServiceApi.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production'
})


setupListeners(store.dispatch)


export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
