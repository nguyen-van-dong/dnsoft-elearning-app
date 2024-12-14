import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import learningService from '../../api/learning.api';

const initialState = {
  loading: false,
  setLearned: false,
  lessonNextPrev: null,
  latestLessonSelected: null,
}

export const setLearnedLesson = createAsyncThunk('learning/mask-lesson-as-learned', async (data) => {
  try {
    return await learningService.maskAsLearned(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getNextPrevLesson = createAsyncThunk('learning/get-next-prev-lesson', async (uuid) => {
  try {
    return await learningService.getNextPrevLesson(uuid);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const setLatestLessonSelected = createAsyncThunk('learning/set-latest-lesson-selected', async (data) => {
  try {
    return await learningService.setLatestLessonSelected(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getLatestLessonSelected = createAsyncThunk('learning/get-latest-lesson-selected', async (uuid) => {
  try {
    return await learningService.getLatestLessonSelected(uuid);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    changeLesson: (state, action) => {
      return { ...state, latestLessonSelected: action.payload };
    },
    setToFalseLearned: (state, action) => {
      return { ...state, setLearned: false };
    },
  },
  extraReducers: (builder) => {
    // Mark lesson as learnied
    builder.addCase(setLearnedLesson.pending, (state, action) => {
      console.log('Pending setLearnedLesson ...');
      state.setLearned = false;
    });
    builder.addCase(setLearnedLesson.fulfilled, (state, action) => {
      console.log(`Fulfilled setLearnedLesson`);
      state.setLearned = true;
    });
    builder.addCase(setLearnedLesson.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected setLearnedLesson...`);
      state.setLearned = false;
    });

    // Get next and previous of the lesson
    builder.addCase(getNextPrevLesson.pending, (state, action) => {
      console.log('Pending getNextPrevLesson ...');
    });
    builder.addCase(getNextPrevLesson.fulfilled, (state, action) => {
      console.log(`Fulfilled getNextPrevLesson`);
      state.lessonNextPrev = action.payload.data;
    });
    builder.addCase(getNextPrevLesson.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getNextPrevLesson...`);
    });

    // Set latest lesson learn
    builder.addCase(setLatestLessonSelected.pending, (state, action) => {
      console.log('Pending setLatestLessonSelected ...');
    });
    builder.addCase(setLatestLessonSelected.fulfilled, (state, action) => {
      console.log(`Fulfilled setLatestLessonSelected`);
    });
    builder.addCase(setLatestLessonSelected.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected setLatestLessonSelected...`);
    });

    // Get latest lesson learn
    builder.addCase(getLatestLessonSelected.pending, (state, action) => {
      console.log('Pending getLatestLessonSelected ...');
    });
    builder.addCase(getLatestLessonSelected.fulfilled, (state, action) => {
      console.log(`Fulfilled getLatestLessonSelected`);
      state.latestLessonSelected = action.payload.data.data;
    });
    builder.addCase(getLatestLessonSelected.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getLatestLessonSelected...`);
    });
  },
});

export const { changeLesson, setToFalseLearned } = learningSlice.actions;

export default learningSlice.reducer;
