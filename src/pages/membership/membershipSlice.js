import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import packageService from '../../api/package.api';

export const getAllMemberships = createAsyncThunk('package/get-membership', async () => {
  try {
    return await packageService.getAllPackages();
  } catch (error) {
    console.log({ error });
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getPackageById = createAsyncThunk('package/get-package-id', async (id) => {
  try {
    return await packageService.getPackageById(id);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const payment = createAsyncThunk('package/payment', async (data) => {
  try {
    return await packageService.payment(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

const initialState = {
  loading: false,
  messageError: null,
  messageSuccess: null,
  memberships: [],
  package: null,
}

export const membershipSlice = createSlice({
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
    //getAllMemberships
    builder.addCase(getAllMemberships.pending, (state, action) => {
      console.log('Pending getAllMemberships ...');
      state.loading = true
    });
    builder.addCase(getAllMemberships.fulfilled, (state, action) => {
      console.log(`Fulfilled getAllMemberships`);
      state.loading = false;
      state.memberships = action.payload.data;
    });
    builder.addCase(getAllMemberships.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getAllMemberships...`);
      state.loading = false;
      const message = action.error.message;
      if (message) {
        const payload = JSON.parse(message);
        state.messageError = payload.message;
      }
    });

    //getPackageById
    builder.addCase(getPackageById.pending, (state, action) => {
      console.log('Pending getPackageById ...');
      state.loading = true
    });
    builder.addCase(getPackageById.fulfilled, (state, action) => {
      console.log(`Fulfilled getPackageById`);
      state.loading = false;
      state.package = action.payload.data;
    });
    builder.addCase(getPackageById.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getPackageById...`);
      state.loading = false;
      const message = action.error.message;
      if (message) {
        const payload = JSON.parse(message);
        state.messageError = payload.message;
      }
    });

    //payment
    builder.addCase(payment.pending, (state, action) => {
      console.log('Pending payment ...');
      state.loading = true
    });
    builder.addCase(payment.fulfilled, (state, action) => {
      console.log(`Fulfilled payment`);
      state.loading = false;
      state.package = action.payload.data;
    });
    builder.addCase(payment.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected payment...`);
      state.loading = false;
      const message = action.error.message;
      if (message) {
        const payload = JSON.parse(message);
        state.messageError = payload.message;
      }
    });
  }
})

export const { setNullErrorMessage, setNullSuccessMessage } = membershipSlice.actions

export default membershipSlice.reducer
