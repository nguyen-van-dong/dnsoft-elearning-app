import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import teacherService from '../../api/teacher.api';

export const getCourseById = createAsyncThunk('teacher/edit-course', async (id) => {
  try {
    return await teacherService.getCourseById(id);
  } catch (error) {
    console.log({ error });
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const registerPartner = createAsyncThunk('teacher/register-partner', async (data) => {
  try {
    return await teacherService.registerPartner(data);
  } catch (error) {
    console.log({ error });
    throw new Error(JSON.stringify(error.response.data))
  }
});

const initialState = {
  loading: false,
  teacher: null,
  messageError: null,
  messageSuccess: null,
}

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setNullErrorMessage: (state) => {
      return { ...state, messageError: null };
    },
    setNullSuccessMessage: (state) => {
      return { ...state, messageSucess: null };
    },
  },
  extraReducers: (builder) => {
    // registerPartner
    builder.addCase(registerPartner.pending, (state, action) => {
      console.log('Pending registerPartner ...');
      state.loading = true
    });
    builder.addCase(registerPartner.fulfilled, (state, action) => {
      console.log(`Fulfilled registerPartner`);
      state.loading = false;
      console.log(action.payload);
      state.messageSuccess = action.payload.data.message;
    });
    builder.addCase(registerPartner.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected registerPartner...`);
      state.loading = false;
      const message = action.error.message;
      if (message) {
        const payload = JSON.parse(message);
        state.messageError = payload.message;
      }
    });
  }
})

export const { setNullErrorMessage, setNullSuccessMessage } = teacherSlice.actions

export default teacherSlice.reducer
