import { configureStore } from '@reduxjs/toolkit'
import accountslice from './Slices/AccountSlice'


export const store = configureStore({
  reducer: {
    accountinfo : accountslice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// import { createStore } from 'redux'
// import { accountReducer } from './ObjectAccountSlice'

// const store = createStore(accountReducer)

// export default store