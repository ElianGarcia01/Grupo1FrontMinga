import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../data/url.jsx';
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await fetch( API_URL + '/categories/allCategories');
  const data = await response.json();
  return data.response;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    all: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
