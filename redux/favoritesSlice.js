import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../data/url';

// favoritos por usuario 
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(API_URL + '/favorites/byUser', {
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

      const response = await fetch(API_URL + '/favorites/delete', {
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
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // case of Remove Favorite
      .addCase(removeFavorite.pending, (state) => {
        state.error = null;
        state.lastRemoved = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter(
          item => String(item.manga_id?._id) !== String(action.payload)
        );
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearFavorites, clearError } = favoritesSlice.actions;
export default favoritesSlice.reducer;