import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// favoritos por usuario 
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch('http://localhost:8080/api/favorites/byUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch favorites');
      }

      const data = await response.json();
      return data.response; 
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

//  eliminar favorito
export const removeFavorite = createAsyncThunk(
  'favorites/removeOne',
  async (manga_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Authentication required');
      }

      const response = await fetch('http://localhost:8080/api/favorites/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ manga_id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to remove favorite');
      }

      return manga_id; 
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastRemoved: null,
  },
  reducers: {
    clearFavorites: (state) => {
      state.items = [];
      state.error = null;
      state.lastRemoved = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearLastRemoved: (state) => {  // <-- Añade este reducer
      state.lastRemoved = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || []; // Asegura que siempre sea un array
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove Favorite
      .addCase(removeFavorite.pending, (state) => {
        state.error = null;
        // No limpiamos lastRemoved aquí para evitar parpadeos en la UI
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        // Comparación más robusta
        state.items = state.items.filter(item => 
          String(item.manga_id._id) !== String(action.payload)
        );
        state.lastRemoved = action.payload;
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.error = action.payload;
        state.lastRemoved = null; // Limpiamos lastRemoved en caso de error
      });
  },
});

export const { clearFavorites, clearError, clearLastRemoved } = favoritesSlice.actions;
export default favoritesSlice.reducer;