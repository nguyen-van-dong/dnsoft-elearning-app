import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import orderService from '../../api/order.api';
import zoneService from '../../api/zone.api';

const initialState = {
  errorCreateOrder: null,
  loading: false,
  course: null,
  order: null,
  orderIsCreated: false,
  loadingCreateOrder: false,
  payment: null,
  provinces: null,
  districts: [],
  townships: [],
  coupon: null,
  errorApplyCoupon: null,
  removeCoupon: null,
  enrollFreeCourse: false,
}

export const createOrder = createAsyncThunk('order/create', async (data) => {
  try {
    return await orderService.create(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const loadQrCode = createAsyncThunk('order/load-qrcode', async (data) => {
  try {
    return await orderService.loadQrCode(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const createTransaction = createAsyncThunk('order/create-transaction', async (data) => {
  try {
    return await orderService.createTransaction(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const handleClickFinished = createAsyncThunk('order/handle-finished', async (data) => {
  try {
    return await orderService.handleFinished(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getAllProvinces = createAsyncThunk('zone/provinces', async () => {
  try {
    return await zoneService.getAllProvinces();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getDistrictsInProvince = createAsyncThunk('zone/get-districts', async (province_id) => {
  try {
    return await zoneService.getDistrictsInProvince(province_id);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const getTownshipsInDistrict = createAsyncThunk('zone/get-township', async (township_id) => {
  try {
    return await zoneService.getTownshipsInDistrict(township_id);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const handleEnrollFreeCourse = createAsyncThunk('order/enroll-free-course', async (course) => {
  try {
    return await orderService.handleEnrollFreeCourse(course);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data))
  }
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setFalseOrderIsCreated: (state) => {
      return { ...state, orderIsCreated: false };
    },
    setNullDistricts: (state) => {
      return { ...state, districts: [] };
    },
    setNullTownships: (state) => {
      return { ...state, townships: [] };
    },
    setNullErrorCreateOrder: (state) => {
      return { ...state, errorCreateOrder: null };
    },
    setNullPayment: (state) => {
      return { ...state, payment: null };
    },
    setFalseEnrollFreeCourse: (state) => {
      return { ...state, enrollFreeCourse: false };
    },
  },
  extraReducers: (builder) => {
    // Fetch create order with user logged in
    builder.addCase(createOrder.pending, (state, action) => {
      console.log('Pending createOrder ...');
      state.orderIsCreated = false;
      state.loadingCreateOrder = true;
      state.orderIsCreated = false;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      console.log(`Fulfilled createOrder`);
      state.order = action.payload.data;
      state.loadingCreateOrder = false;
      state.orderIsCreated = true;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      console.log(`Rejected createOrder...`);
      state.errorCreateOrder = action.error
      state.orderIsCreated = false;
      state.loadingCreateOrder = false;
    });

    // Load QR Code
    builder.addCase(loadQrCode.pending, (state, action) => {
      console.log('Pending loadQrCode ...');
      state.loading = true;
    });
    builder.addCase(loadQrCode.fulfilled, (state, action) => {
      console.log(`Fulfilled loadQrCode`);
      state.payment = action.payload.data
      state.loading = false;
    });
    builder.addCase(loadQrCode.rejected, (state, action) => {
      console.log(`Rejected loadQrCode...`);
      state.payment = action.error;
      state.loading = false;
    });

    // createTransaction
    builder.addCase(createTransaction.pending, (state, action) => {
      console.log('Pending createTransaction ...');
      state.loading = true;
    });
    builder.addCase(createTransaction.fulfilled, (state, action) => {
      console.log(`Fulfilled createTransaction`);
      state.loading = false;
    });
    builder.addCase(createTransaction.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected createTransaction...`);
      state.loading = false;
    });

    // handleClickFinished
    builder.addCase(handleClickFinished.pending, (state, action) => {
      console.log('Pending handleClickFinished ...');
      state.loading = true;
    });
    builder.addCase(handleClickFinished.fulfilled, (state, action) => {
      console.log(`Fulfilled handleClickFinished`);
      state.loading = false;
    });
    builder.addCase(handleClickFinished.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected handleClickFinished...`);
      state.loading = false;
    });

    // Get all provinces
    builder.addCase(getAllProvinces.pending, (state, action) => {
      console.log('Pending getAllProvinces ...');
      state.loading = true;
    });
    builder.addCase(getAllProvinces.fulfilled, (state, action) => {
      console.log(`Fulfilled getAllProvinces`);
      state.provinces = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getAllProvinces.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getAllProvinces...`);
      state.loading = false;
    });

    // Get district in province
    builder.addCase(getDistrictsInProvince.pending, (state, action) => {
      console.log('Pending getDistrictsInProvince ...');
      state.loading = true;
    });
    builder.addCase(getDistrictsInProvince.fulfilled, (state, action) => {
      console.log(`Fulfilled getDistrictsInProvince`);
      state.districts = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getDistrictsInProvince.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getDistrictsInProvince...`);
      state.loading = false;
    });

    // Get township in district
    builder.addCase(getTownshipsInDistrict.pending, (state, action) => {
      console.log('Pending getTownshipsInDistrict ...');
      state.loading = true;
    });
    builder.addCase(getTownshipsInDistrict.fulfilled, (state, action) => {
      console.log(`Fulfilled getTownshipsInDistrict`);
      state.townships = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getTownshipsInDistrict.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getTownshipsInDistrict...`);
      state.loading = false;
    });

    // handleEnrollFreeCourse
    builder.addCase(handleEnrollFreeCourse.pending, (state, action) => {
      console.log('Pending handleEnrollFreeCourse ...');
      state.loading = true;
      state.enrollFreeCourse = false;
    });
    builder.addCase(handleEnrollFreeCourse.fulfilled, (state, action) => {
      console.log(`Fulfilled handleEnrollFreeCourse`);
      state.enrollFreeCourse = true;
      state.loading = false;
    });
    builder.addCase(handleEnrollFreeCourse.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected handleEnrollFreeCourse...`);
      state.loading = false;
      state.enrollFreeCourse = false;
    });
  }
});

export const {
  setFalseOrderIsCreated,
  setNullDistricts,
  setNullTownships,
  setNullErrorCreateOrder,
  setNullPayment,
  setFalseEnrollFreeCourse,
} = orderSlice.actions;

export default orderSlice.reducer;
