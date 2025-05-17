// store.js
import { configureStore } from '@reduxjs/toolkit';
import mangaReducer from './redux/mangaSlice';
import categoryReducer from './redux/categorySlice';


export const store = configureStore({
  reducer: {
    mangas: mangaReducer,
    categories: categoryReducer,
   
  },
});
export default store;
