import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const baseURL = process.env.REACT_APP_BACKEND_API;

export const STATUES = Object.freeze({
  IDLE  : "idle",
  LOADING : "loading",
  ERROR : "error"
})

const initialState = {
  products: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
  isSuccess : false,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URI}/products/getAllProducts`);
    return response.data.data;
});

export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/products/createProduct`, product);
    return response.data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URI}/products/getProductById/${id}`);
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URI}/products/deleteProduct/${id}`);
    return response.data; 
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ( { id, updatedProduct }) => {
  // console.log(updateProduct)
   const formData = new FormData();
      
      // Append all updatedProduct fields to formData
      Object.keys(updatedProduct).forEach(key => {
        if (key === 'productImage' && updatedProduct[key] instanceof File) {
          formData.append(key, updatedProduct[key], updatedProduct[key].name);
        } else {
          formData.append(key, updatedProduct[key]);
        }
      });

      const response = await axios.put(
        `${import.meta.env.VITE_API_URI}/products/updateProduct/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state, action) => {
        state.isSuccess = false;
        state.status = "loading"
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "idle"
        state.isSuccess = true;
        state.products.push(action.payload.data);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "error"
        state.isSuccess = false;
        state.error = action.payload || 'Failed to create product';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch product by ID';
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "idle"
        state.products = state.products.filter(product => product._id !== action.payload.data._id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "error"
        state.error = action.payload || 'Failed to delete product';
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.isSuccess = false;
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(product => product._id === action.payload.data._id);
        if (index !== -1) {
          state.products[index] = action.payload.data;
        }
        state.selectedProduct = action.payload;
        state.isSuccess = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'error';
        state.isSuccess = false;
        state.error = action.payload || 'Failed to update product';
      });
  },
});

export default productsSlice.reducer;
