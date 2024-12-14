import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import courseService from '../../api/course.api';

export const getAllCourses = createAsyncThunk('courses/list', async (category = '') => {
  try {
    return await courseService.getCourses(category);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getAllCourseCategory = createAsyncThunk('courses/all-category', async () => {
  try {
    return await courseService.getAllCategories();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getCourseBySlug = createAsyncThunk('courses/get-by-slug', async ({ slug }) => {
  try {
    return await courseService.getCourseBySlug(slug);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getCourseByUuid = createAsyncThunk('courses/get-by-uuid', async ({ uuid }) => {
  try {
    return await courseService.getCourseByUuid(uuid);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const activeCourse = createAsyncThunk('courses/active-course', async (data) => {
  try {
    return await courseService.activeCourse(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

const initialState = {
  entities: [],
  loading: false,
  course: null,
  categories: [],
  messageError: null,
  messageSucess: null,
  isCourseValid: true,
}

export const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setNullErrorMessage: (state) => {
      return { ...state, messageError: null };
    },
    setNullSuccessMessage: (state) => {
      return { ...state, messageSucess: null };
    },
    setTrueIsCourseValid: (state) => {
      return { ...state, isCourseValid: true };
    },
  },
  extraReducers: (builder) => {
    // Fetch courses
    builder.addCase(getAllCourses.pending, (state, action) => {
      console.log('Pending getAllCourses ...');
      state.loading = true
    });
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      console.log(`Fulfilled getAllCourses`);
      state.loading = false
      state.entities = action.payload.data;
    });
    builder.addCase(getAllCourses.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getAllCourses...`);
      state.loading = false
    });

    // Fetch course by slug
    builder.addCase(getCourseBySlug.pending, (state, action) => {
      console.log('Pending getCourseBySlug ...');
      state.loading = true
    });
    builder.addCase(getCourseBySlug.fulfilled, (state, action) => {
      console.log(`Fulfilled getCourseBySlug`);
      state.loading = false
      state.course = action.payload.data;
    });
    builder.addCase(getCourseBySlug.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getCourseBySlug...`);
      state.loading = false;
    });

    // Get course by uuid
    builder.addCase(getCourseByUuid.pending, (state, action) => {
      console.log('Pending getCourseByUuid ...');
      state.loading = true
    });
    builder.addCase(getCourseByUuid.fulfilled, (state, action) => {
      console.log(`Fulfilled getCourseByUuid`);
      state.loading = false
      state.course = action.payload.data;
      state.isCourseValid = false;
    });
    builder.addCase(getCourseByUuid.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getCourseByUuid...`);
      state.loading = false;
      state.isCourseValid = true;
    });

    // Active course
    builder.addCase(activeCourse.pending, (state, action) => {
      console.log('Pending activeCourse ...');
      state.loading = true
    });
    builder.addCase(activeCourse.fulfilled, (state, action) => {
      console.log(`Fulfilled activeCourse`);
      state.loading = false
      state.course = action.payload.data;
      state.messageSucess = action.payload.data.message;
    });
    builder.addCase(activeCourse.rejected, (state, action) => {
      const message = action.error.message;
      if (message) {
        const payload = JSON.parse(message);
        state.messageError = payload.message;
      }
      console.log(`Rejected activeCourse...`);
      state.loading = false;
    });

    // Get all course categories
    builder.addCase(getAllCourseCategory.pending, (state, action) => {
      console.log('Pending getAllCourseCategory ...');
      state.loading = true
    });
    builder.addCase(getAllCourseCategory.fulfilled, (state, action) => {
      console.log(`Fulfilled getAllCourseCategory`);
      state.loading = false
      state.categories = action.payload.data;
    });
    builder.addCase(getAllCourseCategory.rejected, (state, action) => {
      console.log(`Rejected getAllCourseCategory...`);
      state.loading = false;
    });
  }
})

export const {
  setNullErrorMessage,
  setNullSuccessMessage,
  setTrueIsCourseValid,
} = courseSlice.actions

export default courseSlice.reducer
