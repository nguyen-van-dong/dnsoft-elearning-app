import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import couponService from '../../api/coupon.api';

const initialState = {
  loading: false,
  errorApplyCoupon: null,
  removeCoupon: null,
  couponApplied: null,
  errorGetCoupon: null,
}

export const applyCoupon = createAsyncThunk('coupon/apply-coupon', async (data) => {
  try {
    return await couponService.applyCoupon(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const removeCouponApplied = createAsyncThunk('coupon/remove-coupon', async (data) => {
  try {
    return await couponService.removeCouponApplied(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getCouponByCourseId = createAsyncThunk('coupon/get-coupon', async (courseId) => {
  try {
    return await couponService.getCoupon(courseId);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    setNullErrorApplyCoupon: (state) => {
      return { ...state, errorApplyCoupon: null };
    },
    setNullErrorGetCoupon: (state) => {
      return { ...state, errorGetCoupon: null };
    },
  },
  extraReducers: (builder) => {
    // applyCoupon
    builder.addCase(applyCoupon.pending, (state, action) => {
      console.log('Pending applyCoupon ...');
      state.loading = true;
    });
    builder.addCase(applyCoupon.fulfilled, (state, action) => {
      console.log(`Fulfilled applyCoupon`);
      state.couponApplied = action.payload.data;
      state.loading = false;
    });
    builder.addCase(applyCoupon.rejected, (state, action) => {
      console.log(`Rejected applyCoupon...`);
      const { message } = JSON.parse(action.error.message);
      state.errorApplyCoupon = message;
      state.loading = false;
    });

    // removeCouponApplied
    builder.addCase(removeCouponApplied.pending, (state, action) => {
      console.log('Pending removeCouponApplied ...');
      state.loading = true;
    });
    builder.addCase(removeCouponApplied.fulfilled, (state, action) => {
      console.log(`Fulfilled removeCouponApplied`);
      state.removeCoupon = action.payload.data;
      state.loading = false;
    });
    builder.addCase(removeCouponApplied.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected removeCouponApplied...`);
      const { message } = JSON.parse(action.error.message);
      state.errorApplyCoupon = message;
      state.loading = false;
    });

    // getCouponByCourseId
    builder.addCase(getCouponByCourseId.pending, (state, action) => {
      console.log('Pending getCouponByCourseId ...');
      state.loading = true;
    });
    builder.addCase(getCouponByCourseId.fulfilled, (state, action) => {
      console.log(`Fulfilled getCouponByCourseId`);
      state.couponApplied = action.payload.data.data;
      state.loading = false;
    });
    builder.addCase(getCouponByCourseId.rejected, (state, action) => {
      console.log(`Rejected getCouponByCourseId...`);
      const { message } = JSON.parse(action.error.message);
      state.errorGetCoupon = message;
      state.loading = false;
    });
  }
});

export const {
  setNullErrorApplyCoupon,
  setNullErrorGetCoupon,
} = couponSlice.actions;

export default couponSlice.reducer;
