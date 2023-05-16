import { configureStore } from '@reduxjs/toolkit'
import { invoiceApi } from './api/invoice.api'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import userReducer from './user/user'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(invoiceApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
