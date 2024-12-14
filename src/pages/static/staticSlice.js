import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import staticService from '../../api/static.api';

export const getStaticPage = createAsyncThunk('static/get-page', async (page) => {
  try {
    return await staticService.getStaticPage(page);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

const initialState = {
  page: null,
  loading: false,
  messageErrSubmit: null,
}

export const staticSlice = createSlice({
  name: 'static',
  initialState,
  reducers: {
    setMessageErrSubmit: (state) => {
      return { ...state, messageErrSubmit: null };
    },
  },
  extraReducers: (builder) => {
    // Fetch about me
    builder.addCase(getStaticPage.pending, (state, action) => {
      console.log('Pending getStaticPage ...');
      state.loading = true
    });
    builder.addCase(getStaticPage.fulfilled, (state, action) => {
      console.log(`Fulfilled getStaticPage`);
      state.loading = false
      state.page = action.payload.data
    });
    builder.addCase(getStaticPage.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getStaticPage...`);
      state.loading = false
    });
  }
})

export const { setMessageErrSubmit } = staticSlice.actions

export default staticSlice.reducer
