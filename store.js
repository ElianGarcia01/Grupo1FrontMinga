// store.js
import { configureStore } from '@reduxjs/toolkit';
import mangaReducer from './redux/mangaSlice';
import categoryReducer from './redux/categorySlice';
import chapterReducer from './redux/chapterSlice';
import favoritesReducer from "./redux/favoritesSlice"

export const store = configureStore({
  reducer: {
    mangas: mangaReducer,
    categories: categoryReducer,
    chapters: chapterReducer,
    favorites: favoritesReducer,
   
  },
});
export default store;
