import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/Product';

interface ProductsState {
  items: Product[];
  favorites: Product[];
  status: 'idle' | 'loading' | 'success' | 'reject';
  category: string | null;
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
}

const initialState: ProductsState = {
  items: [],
  favorites: [], 
  status: 'idle',
  category: null,
  sortOrder: 'asc',
  searchQuery: '',
};

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  return response.json();
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string | null>) {
      state.category = action.payload;
    },
    setSortOrder(state, action: PayloadAction<'asc' | 'desc'>) {
      state.sortOrder = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<Product>) {
      const index = state.favorites.findIndex(product => product.id === action.payload.id);
      if (index === -1) {
        state.favorites.push(action.payload); 
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites)); 
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(product => product.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites)); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'reject';
      });
  },
});

export const { setCategory, setSortOrder, setSearchQuery, toggleFavorite, removeFavorite } = productsSlice.actions;
export default productsSlice.reducer;
