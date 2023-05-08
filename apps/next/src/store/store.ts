import { configureStore } from '@reduxjs/toolkit'
import { invoiceApi } from './invoice.api'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    [invoiceApi.reducerPath]: invoiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(invoiceApi.middleware),
})

setupListeners(store.dispatch)

// export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch
