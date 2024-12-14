import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import homeService from '../../api/home.api';

export const getAllSliders = createAsyncThunk('home/sliders', async () => {
  try {
    return await homeService.getSliders();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getAllReasonsLearn = createAsyncThunk('home/reasons-learn', async () => {
  try {
    return await homeService.getReasonsLearn();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getVideoList = createAsyncThunk('home/videos', async () => {
  try {
    return await homeService.getVideoList();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

const initialState = {
  slides: [],
  videos: [],
  reasonsLearn: [],
  loading: false,
  course: null,
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Fetch courses
    builder.addCase(getAllSliders.pending, (state, action) => {
      console.log('Pending getAllSliders ...');
      state.loading = true
    });
    builder.addCase(getAllSliders.fulfilled, (state, action) => {
      console.log(`Fulfilled getAllSliders`);
      state.loading = false
      state.slides = action.payload.data;
    });
    builder.addCase(getAllSliders.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getAllSliders...`);
      state.loading = false
    });

    // Fetch videos
    builder.addCase(getVideoList.pending, (state, action) => {
      console.log('Pending getVideoList ...');
      state.loading = true
    });
    builder.addCase(getVideoList.fulfilled, (state, action) => {
      console.log(`Fulfilled getVideoList`);
      state.loading = false
      state.videos = action.payload.data;
    });
    builder.addCase(getVideoList.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getVideoList...`);
      state.loading = false
    });

    // Fetch getAllReasonsLearn
    builder.addCase(getAllReasonsLearn.pending, (state, action) => {
      console.log('Pending getAllReasonsLearn ...');
      state.loading = true
    });
    builder.addCase(getAllReasonsLearn.fulfilled, (state, action) => {
      console.log(`Fulfilled getAllReasonsLearn`);
      state.loading = false
      state.reasonsLearn = action.payload.data;
    });
    builder.addCase(getAllReasonsLearn.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getAllReasonsLearn...`);
      state.loading = false
    });
  }
});

export default homeSlice.reducer
