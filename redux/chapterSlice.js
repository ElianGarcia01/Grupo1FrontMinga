import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from '../data/url.jsx';
// Acción para obtener TODOS los capítulos
export const getChapters = createAsyncThunk(
  "chapters/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch( API_URL +`/chapters/allChapters`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener capítulos');
      }
      const data = await response.json();
      return data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Acción para obtener capítulos por mangaId
export const getChaptersByManga = createAsyncThunk(
  "chapters/getByManga",
  async (mangaId, { rejectWithValue }) => {
    try {
      const response = await fetch( API_URL + `/chapters/allChapters?manga_id=${mangaId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener capítulos');
      }
      const data = await response.json();
      return data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Acción para obtener un capítulo específico por ID
export const getChapterById = createAsyncThunk(
  "chapters/getById",
  async (chapterId, { rejectWithValue }) => {
    try {
      // Usa la ruta de filtrado que funciona con tu backend
      const response = await fetch( API_URL + `/chapters/allChapters?id=${chapterId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Capítulo no encontrado');
      }
      
      const data = await response.json();
      // Si es un array (de allChapters), devuelve el primer elemento
      return Array.isArray(data.response) ? data.response[0] : data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Mantener compatibilidad con el nombre anterior
export const getChapterDetails = getChapterById;

const chapterSlice = createSlice({
  name: "chapters",
  initialState: {
    all: [],        // Todos los capítulos
    list: [],       // Lista de capítulos del manga actual
    current: null,  // Capítulo actualmente visualizado
    loading: false,
    error: null
  },
  reducers: {
    resetChapters: (state) => {
      state.list = [];
      state.current = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentChapter: (state, action) => {
      state.current = action.payload;
    },
    setChaptersList: (state, action) => {
      state.list = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // getChapters (todos los capítulos)
      .addCase(getChapters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChapters.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(getChapters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // getChaptersByManga
      .addCase(getChaptersByManga.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChaptersByManga.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getChaptersByManga.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // getChapterById / getChapterDetails (ambos usan la misma acción)
      .addCase(getChapterById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChapterById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(getChapterById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetChapters, clearError, setCurrentChapter, setChaptersList } = chapterSlice.actions;
export default chapterSlice.reducer;