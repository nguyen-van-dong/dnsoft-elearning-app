import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import commentService from '../../api/comment.api';


const initialState = {
  comment: null,
  loading: false,
  note: null,
  comments: [],
  loadingComment: false,
}

export const createComment = createAsyncThunk('comment/create', async (data) => {
  try {
    return await commentService.create(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getComments = createAsyncThunk('comment/lists', async (lessonId) => {
  try {
    return await commentService.getComments(lessonId);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const deleteComment = createAsyncThunk('comment/delete-comment', async (data) => {
  try {
    return await commentService.deleteComment(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setEmptyComments: (state, action) => {
      return {...state, comments: []}
    },
  },
  extraReducers: (builder) => {
    // Create comment lists
    builder.addCase(createComment.pending, (state, action) => {
      console.log('Pending createComment ...');
      state.loading = true;
      state.loadingComment = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      console.log(`Fulfilled createComment`);
      state.loading = false;
      state.comment = action.payload.data;
      state.loadingComment = false;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected createComment...`);
      state.loading = false;
      state.loadingComment = false;
    });

    // Fetch comment lists
    builder.addCase(getComments.pending, (state, action) => {
      console.log('Pending getComments ...');
      state.loading = true;
      state.loadingComment = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      console.log(`Fulfilled getComments`);
      state.loading = false;
      state.comments = action.payload.data;
      state.loadingComment = false;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getComments...`);
      state.loading = false;
      state.loadingComment = false;
    });

    // Delete comment
    builder.addCase(deleteComment.pending, (state, action) => {
      console.log('Pending deleteComment ...');
      state.loading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      console.log(`Fulfilled deleteComment`);
      state.loading = false;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected deleteComment...`);
      state.loading = false;
    });
  },
});

export const { setEmptyComments } = commentSlice.actions;

export default commentSlice.reducer;
