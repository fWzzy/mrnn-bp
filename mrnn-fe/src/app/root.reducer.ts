import { combineReducers } from '@reduxjs/toolkit'

// Reducers
import authReducer from 'features/auth/auth.slice'
import bookReducer from 'features/book/book.slice'


const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer