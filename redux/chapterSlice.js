import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getChapters = createAsyncThunk('chapters/getChapters', async () => {
  const response = await fetch('http://localhost:8080/api/chapters/allChapters');
  const data = await response.json();
  return data.response;
});

const chapterSlice = createSlice({
  name: 'chapters',
  initialState: {
    all: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChapters.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChapters.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(getChapters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default chapterSlice.reducer;
