import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk con token
export const fetchMangas = createAsyncThunk(
  'mangas/fetchMangas',
  async (_, { rejectWithValue }) => {
    try {
      // Obtener el token (ajusta el origen según tu app)
      const token = localStorage.getItem('token');

      // Hacer la petición con la cabecera Authorization
      const res = await fetch('http://localhost:8080/api/mangas/allMangas', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,        
        },
      });

      // Si la API responde con error, propaga la causa
      if (!res.ok) {
        const err = await res.json();                   
        return rejectWithValue(err.message || 'Error al obtener mangas');
      }

      const data = await res.json();
      return data.response;                             
    } catch (err) {
      // error de red u otra excepción
      return rejectWithValue(err.message);
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
  reducers: {},
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
        state.error = action.payload; 
      });
  },
});

export default mangaSlice.reducer;
