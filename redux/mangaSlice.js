import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk para traer mangas, toma el token desde localStorage
export const fetchMangas = createAsyncThunk(
  'mangas/fetchMangas',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token'); // Ajusta el nombre de la key si usas otro

    if (!token) {
      return thunkAPI.rejectWithValue('No token found in localStorage');
    }

    try {
      const response = await fetch('http://localhost:8080/api/mangas/allMangas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.message || 'Failed to fetch mangas');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const mangaSlice = createSlice({
  name: 'mangas',
  initialState: {
    all: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Puedes agregar reducers si quieres manipular estado manualmente
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMangas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMangas.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchMangas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default mangaSlice.reducer;
