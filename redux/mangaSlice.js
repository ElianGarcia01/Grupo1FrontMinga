import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1️⃣ thunk con token
export const fetchMangas = createAsyncThunk(
  'mangas/fetchMangas',
  async (_, { rejectWithValue }) => {
    try {
      // 1. Obtener el token (ajusta el origen según tu app)
      const token = localStorage.getItem('token');      // o desde Redux: getState().auth.token

      // 2. Hacer la petición con la cabecera Authorization
      const res = await fetch('http://localhost:8080/api/mangas/allMangas', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,             // ⬅️ aquí va el JWT
        },
      });

      // 3. Si la API responde con error, propaga la causa
      if (!res.ok) {
        const err = await res.json();                   // asume que tu API devuelve {message: "..."}
        return rejectWithValue(err.message || 'Error al obtener mangas');
      }

      const data = await res.json();
      return data.response;                             // <- payload para el fulfilled
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
        state.error = action.payload; // llega desde rejectWithValue
      });
  },
});

export default mangaSlice.reducer;
