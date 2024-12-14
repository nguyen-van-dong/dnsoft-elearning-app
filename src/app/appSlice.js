import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import appService from '../api/app.api';

const initialState = {
  selectedMenu: 'home',
  paymentMethods: [],
  messageErrGetPaymentMethods: null,
  isLearningLayout: false,
  colCarouselContent: 19,
  colCarouselLeft: 4,
  marginLeft: 60,
  isAuthenticated: true,
  searchResult: null,
  searching: false,
};

export const getPaymentMethods = createAsyncThunk('app/getPaymentMethods', async () => {
  try {
    return await appService.getPaymentMethods()
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const checkHasAuthenticate = createAsyncThunk('app/checkHasAuthenticate', async () => {
  try {
    return await appService.checkHasAuthenticate();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const handleSearch = createAsyncThunk('app/handleSearch', async (value) => {
  try {
    return await appService.handleSearch(value);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedMenu: (state, action) => {
      return { ...state, selectedMenu: action.payload };
    },
    setIsLearningLayout: (state, action) => {
      return { ...state, isLearningLayout: action.payload };
    },
    setColCarouselContent: (state, action) => {
      return { ...state, colCarouselContent: action.payload };
    },
    setColCarouselLeft: (state, action) => {
      return { ...state, colCarouselLeft: action.payload };
    },
    setMarginLeft: (state, action) => {
      return { ...state, marginLeft: action.payload };
    },
    setNullSearchResult: (state) => {
      return { ...state, searchResult: null };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPaymentMethods.pending, (state, action) => {
      state.loading = true;
      console.log(`Pending getPaymentMethods ...`);
    });
    builder.addCase(getPaymentMethods.fulfilled, (state, action) => {
      if (action.payload) {
        state.loading = false;
        console.log(`Fulfilled getPaymentMethods...`);
        state.paymentMethods = action.payload.data
      } else {
        state.errors.push('Invalid getPaymentMethods')
      }
    });
    builder.addCase(getPaymentMethods.rejected, (state, action) => {
      state.loading = false;
      console.log(`Rejected getPaymentMethods ...`);
      const message = JSON.parse(action.error.message);
      const errors = message.errors;
      state.messageErrGetPaymentMethods = errors;
    });

    // Check user is still authenticate
    builder.addCase(checkHasAuthenticate.pending, (state, action) => {
      state.loading = true;
      console.log(`Pending checkHasAuthenticate ...`);
    });
    builder.addCase(checkHasAuthenticate.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.data.status;
      console.log(`Fulfilled checkHasAuthenticate ...`);
    });
    builder.addCase(checkHasAuthenticate.rejected, (state, action) => {
      state.loading = false;
      console.log(`Rejected checkHasAuthenticate ...`);
      state.isAuthenticated = false;
    });

    // Search course, post or video
    builder.addCase(handleSearch.pending, (state, action) => {
      state.searching = true;
      console.log(`Pending handleSearch ...`);
    });
    builder.addCase(handleSearch.fulfilled, (state, action) => {
      state.searchResult = action.payload.data;
      console.log(`Fulfilled handleSearch ...`);
      state.searching = false;
    });
    builder.addCase(handleSearch.rejected, (state, action) => {
      state.searching = false;
      console.log(`Rejected handleSearch ...`);
    });
  }
});

export const
  {
    setSelectedMenu,
    setIsLearningLayout,
    setColCarouselContent,
    setColCarouselLeft,
    setMarginLeft,
    setNullSearchResult,
  } = appSlice.actions

export default appSlice.reducer
