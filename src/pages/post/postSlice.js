import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postService from '../../api/post.api';

export const getAllPosts = createAsyncThunk('posts/list', async (page = 1) => {
  try {
    return await postService.getPosts(page);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getPostBySlug = createAsyncThunk('posts/get-by-slug', async ({ value }) => {
  try {
    return await postService.getPostBySlug(value);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

const initialState = {
  entities: [],
  loading: false,
  post: null
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.entities.push(action.payload)
      return state;
    },
    deletePost: (state, action) => {
      if (action.payload) {
        state = state.entities.filter(item => item.id !== action.payload.id)
        return state;
      }
    },
    updatePost: (state, action) => {
      state = state.entities.filter(item => item.id !== action.payload.id)
      state.push(action.payload)
      return state;
    },

    setNullPost: (state) => {
      return { ...state, post: null };
    },
  },
  extraReducers: (builder) => {
    // Fetch posts
    builder.addCase(getAllPosts.pending, (state, action) => {
      console.log('Pending getAllPosts ...');
      state.loading = true
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      console.log(`Fulfilled getAllPosts`);
      state.loading = false
      state.entities = action.payload.data
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getAllPosts...`);
      state.loading = false
    });

    // Fetch post by slug
    builder.addCase(getPostBySlug.pending, (state, action) => {
      console.log('Pending getPostBySlug ...');
      state.loading = true
    });
    builder.addCase(getPostBySlug.fulfilled, (state, action) => {
      console.log(`Fulfilled getPostBySlug`);
      state.loading = false
      state.post = action.payload.data.data;
    });
    builder.addCase(getPostBySlug.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getPostBySlug...`);
      state.loading = false
    });
  }
});

export const { addPost, deletePost, updatePost, setNullPost } = postSlice.actions;

export default postSlice.reducer;
