import {configureStore} from '@reduxjs/toolkit';
import wishlistReducer from './features/wishlist/wishlistSlice';
import {fansApi} from './features/fans/fansApi';

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    [fansApi.reducerPath]: fansApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(fansApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
