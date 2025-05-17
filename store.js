// store.js
import { configureStore } from '@reduxjs/toolkit';
import mangaReducer from './redux/mangaSlice';
import categoryReducer from './redux/categorySlice';
import chapterReducer from './redux/chapterSlice';


export const store = configureStore({
  reducer: {
    mangas: mangaReducer,
    categories: categoryReducer,
    chapters: chapterReducer
   
  },
});
export default store;
