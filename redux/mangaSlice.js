import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../data/url';

export const fetchMangas = createAsyncThunk(
  'mangas/fetchMangas',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      const res = await fetch(API_URL + '/mangas/allMangas', {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      
      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message || `Error ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      
      if (data && data.response) {
        return data.response;
      } else if (Array.isArray(data)) {
        return data;
      } else {
        return rejectWithValue('Estructura de datos inesperada');
      }
    } catch (err) {
      return rejectWithValue(`Error de conexión: ${err.message}`);
    }
  }
);

export const fetchMangaById = createAsyncThunk(
  'mangas/fetchMangaById',
  async (mangaId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      const res = await fetch(API_URL + `/mangas/${mangaId}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      
      if (!res.ok) {
        const err = await res.json();
        return rejectWithValue(err.message || `Error ${res.status}`);
      }
      
      const data = await res.json();
      return data.response || data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const mangaSlice = createSlice({
  name: 'mangas',
  initialState: {
    all: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentManga: (state, action) => {
      state.current = action.payload;
    },
    clearCurrentManga: (state) => {
      state.current = null;
    },
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
        state.error = null;
      })
      .addCase(fetchMangas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMangaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMangaById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        state.error = null;
      })
      .addCase(fetchMangaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentManga, clearCurrentManga } = mangaSlice.actions;
export default mangaSlice.reducer;