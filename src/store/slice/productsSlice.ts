import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  return response.json();
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'reject';
      });
  },
});

export default productsSlice.reducer;
