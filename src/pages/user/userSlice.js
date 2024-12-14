import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from '../../api/user.api';

export const setting = createAsyncThunk('user/setting', async () => {
  try {
    return await userService.setting();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getCourses = createAsyncThunk('user/courses', async () => {
  try {
    return await userService.getCourses();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getUser = createAsyncThunk('user/get-user', async () => {
  try {
    return await userService.getUser();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const updateUser = createAsyncThunk('user/update-user', async (data) => {
  try {
    return await userService.updateUser(data);
  } catch (error) {
    console.log({ error });
    throw new Error(JSON.stringify(error.response.data))
  }
});

const initialState = {
  loading: false,
  courses: [],
  user: null,
  messageError: null,
  messageSuccess: null,
}

export const userSlice = createSlice({
  name: 'user',
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
    // Fetch Setting
    builder.addCase(setting.pending, (state, action) => {
      console.log('Pending setting ...');
      state.loading = true;
    });
    builder.addCase(setting.fulfilled, (state, action) => {
      console.log(`Fulfilled setting`);
      state.loading = false;
      //   state.entities = action.payload
    });
    builder.addCase(setting.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected setting...`);
      state.loading = false;
    });

    // Fetch courses
    builder.addCase(getCourses.pending, (state, action) => {
      console.log('Pending getCourses ...');
      state.loading = true;
    });
    builder.addCase(getCourses.fulfilled, (state, action) => {
      console.log(`Fulfilled getCourses`);
      state.loading = false;
      state.courses = action.payload.data;
    });
    builder.addCase(getCourses.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getCourses...`);
      state.loading = false;
    });

    // Fetch get user information
    builder.addCase(getUser.pending, (state, action) => {
      console.log('Pending getUser ...');
      state.loading = true
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log(`Fulfilled getUser`);
      state.loading = false;
      state.user = action.payload.data.data;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getUser...`);
      state.loading = false;
    });

    // updateUser
    builder.addCase(updateUser.pending, (state, action) => {
      console.log('Pending updateUser ...');
      state.loading = true
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(`Fulfilled updateUser`);
      state.loading = false;
      state.messageSuccess = action.payload.data.message;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected updateUser...`);
      state.loading = false;
      const message = action.error.message;
      if (message) {
        const payload = JSON.parse(message);
        state.messageError = payload.message;
      }
    });
  }
})

export const { setNullErrorMessage, setNullSuccessMessage } = userSlice.actions

export default userSlice.reducer
