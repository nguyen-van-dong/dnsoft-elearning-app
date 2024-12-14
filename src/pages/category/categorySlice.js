import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoryService from '../../api/category.api';

export const getAllCategories = createAsyncThunk('category/list', async () => {
  try {
    return await categoryService.getAllCategories();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
})

export const getCategoryBySlug = createAsyncThunk('category/get-by-slug', async ({ slug }) => {
  try {
    return await categoryService.getCategoriesBySlug(slug);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
})

export const getPostsByCategory = createAsyncThunk('category/get-post-by-category', async (id) => {
  try {
    return await categoryService.getPostsByCategory(id);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
})

const initialState = {
  entities: [],
  loading: false,
  posts: null
}

export const categorySlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.entities.push(action.payload)
      return state;
    },
  },
  extraReducers: (builder) => {
    // Fetch categories
    builder.addCase(getAllCategories.pending, (state, action) => {
      console.log('Pending getAllCategories ...');
      state.loading = true
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      console.log(`Fulfilled getAllCategories`);
      state.loading = false
      state.entities = action.payload.data
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getAllCategories...`);
      state.loading = false
    });

    // Fetch categories by slug
    builder.addCase(getCategoryBySlug.pending, (state, action) => {
      console.log('Pending getCategoryBySlug ...');
      state.loading = true
    });
    builder.addCase(getCategoryBySlug.fulfilled, (state, action) => {
      console.log(`Fulfilled getCategoryBySlug`);
      state.loading = false;
      state.posts = action.payload.data;
    });
    builder.addCase(getCategoryBySlug.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getCategoryBySlug...`);
      state.loading = false
    });

    // Fetch post by category
    builder.addCase(getPostsByCategory.pending, (state, action) => {
      console.log('Pending getPostsByCategory ...');
      state.loading = true
    });
    builder.addCase(getPostsByCategory.fulfilled, (state, action) => {
      console.log(`Fulfilled getPostsByCategory`);
      state.loading = false;
      state.posts = action.payload.data;
    });
    builder.addCase(getPostsByCategory.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getPostsByCategory...`);
      state.loading = false
    });
  }
})

export const { addCourse } = categorySlice.actions

export default categorySlice.reducer
