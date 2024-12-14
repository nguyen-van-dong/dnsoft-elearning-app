import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import paymentService from '../../api/payment.api';

const initialState = {
  paymentMethods: [],
};

export const getPaymentMethods = createAsyncThunk('app/getPaymentMethods', async () => {
  try {
    return await paymentService.getPaymentMethods()
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setSelectedMenu: (state, action) => {
      return { ...state, selectedMenu: action.payload };
    },
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
  }
});

export const
  {
    setSelectedMenu,
  } = paymentSlice.actions

export default paymentSlice.reducer
