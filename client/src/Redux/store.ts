import { configureStore } from '@reduxjs/toolkit'
import AccountSlice from './Slices/AccountSlice'

export const store = configureStore({
  reducer: {
    Account : AccountSlice
  }
})

export type RootState = typeof store.getState
export type AppDispatch = typeof store.dispatch

// import { createStore } from 'redux'
// import { accountReducer } from './ObjectAccountSlice'

// const store = createStore(accountReducer)

// export default store