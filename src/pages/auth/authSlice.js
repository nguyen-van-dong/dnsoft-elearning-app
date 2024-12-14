import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../api/auth.api";
import useAuth from "../../hooks/useAuth";
import { logoutSocial, signInWithSocial } from "../../utils/firebase";

export const register = createAsyncThunk('users/register', async (data) => {
  try {
    return await authService.register(data)
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const login = createAsyncThunk('users/login', async ({ login, password }) => {
  const data = { login, password }
  try {
    return await authService.login(data)
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const logout = createAsyncThunk('users/logout', async () => {
  try {
    const user = useAuth();
    if (user && user.isSocial) {
      return logoutSocial();
    }
    return await authService.logout();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const verify = createAsyncThunk('users/verify', async ({ code, email }) => {
  try {
    return await authService.verify({ code, email })
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const socialAuthentication = createAsyncThunk('users/socialAuthenticate', async (social_platform) => {
  try {
    const user = await signInWithSocial(social_platform);
    let data = { social_platform };
    switch (social_platform) {
      case 'facebook':
      case 'google':
        data = {
          ...data,
          social_id: user.uid,
          name: user.displayName,
          email: user.email,
          phone: user.phone,
          social_avatar: user.photoURL
        }
        break;
      default:
        // TODO: Login with github
        break;
    }
    return await authService.handleSocialAuthenticate(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

const initialState = {
  users: [],
  loading: false,
  user: null,
  errors: [],
  messageErrRegister: null,
  messageErrLogin: null,
  messageErrVerify: null,
  title: null,
  showFormVerify: false,
  disabledSubmitVerify: false,
}

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setMessErrLogin: (state) => {
      return { ...state, messageErrLogin: null };
    },
    setMessErrRegister: (state) => {
      return { ...state, messageErrRegister: null };
    },
    setMessErrVerify: (state) => {
      return { ...state, messageErrVerify: null };
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      console.log(`Pending login ...`);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.loading = false;
        console.log(`Fulfilled login...`);
        state.user = action.payload
      } else {
        state.errors.push('Invalid email or password')
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      console.log(`Rejected login ...`);
      const message = JSON.parse(action.error.message);
      const errors = message.errors;
      state.messageErrLogin = errors;
    });

    // Social login
    builder.addCase(socialAuthentication.pending, (state, action) => {
      // state.loading = true;
      console.log(`Pending socialAuthentication ...`);
    });
    builder.addCase(socialAuthentication.fulfilled, (state, action) => {
      if (action.payload) {
        state.loading = false;
        state.user = action.payload
      } else {
        state.errors.push('Invalid email or password')
      }
    });
    builder.addCase(socialAuthentication.rejected, (state, action) => {
      state.loading = false;
      console.log(`Rejected socialAuthentication ...`);
      state.messageErrLogin = action.error.message;
    });

    // Register
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      console.log(`Pending register ...`);
      state.messageErrRegister = '';
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(`Fulfilled register...`);
        state.loading = false;
        state.user = action.payload
        state.messageErrRegister = '';
        state.title = 'Vui lòng nhập mã xác thực';
        state.showFormVerify = true
      }
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      console.log(`Rejected register ...`);
      const message = JSON.parse(action.error.message);
      const errors = message.errors;
      state.messageErrRegister = errors;
    });

    // Verify
    builder.addCase(verify.pending, (state, action) => {
      state.loading = true;
      console.log(`Pending verify ...`);
      state.messageErrVerify = '';
      state.disabledSubmitVerify = true;
    });
    builder.addCase(verify.fulfilled, (state, action) => {
      if (action.payload) {
        state.loading = false;
        console.log(`Fulfilled verify...`);
        state.user = action.payload;
        state.messageErrVerify = '';
        state.disabledSubmitVerify = false;
      }
    });
    builder.addCase(verify.rejected, (state, action) => {
      state.loading = false;
      state.disabledSubmitVerify = false;
      console.log(`Rejected verify ...`);
      const message = JSON.parse(action.error.message);
      const errors = message.errors;
      state.messageErrVerify = errors;
    });
  }
})

export const { setMessErrLogin, setMessErrRegister, setMessErrVerify } = authSlice.actions

export default authSlice.reducer
