import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMangas = createAsyncThunk('mangas/fetchMangas', async () => {
  const response = await fetch('http://localhost:8080/api/mangas/allMangas');
  const data = await response.json();
  return data.response;
});

const mangaSlice = createSlice({
  name: 'mangas',
  initialState: {
    all: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMangas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMangas.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchMangas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mangaSlice.reducer;
