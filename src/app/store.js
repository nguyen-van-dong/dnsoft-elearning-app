import { configureStore } from "@reduxjs/toolkit";

import appReducer from './appSlice';
import homeReducer from '../pages/home/homeSlice';
import postReducer from '../pages/post/postSlice';
import authReducer from '../pages/auth/authSlice';
import courseReducer from '../pages/course/courseSlice';
import categoryReducer from '../pages/category/categorySlice';
import orderReducer from '../pages/order/orderSlice';
import userReducer from '../pages/user/userSlice';
import noteReducer from '../pages/note/noteSlice';
import learningReducer from '../pages/learning/learningSlice';
import commentReducer from '../pages/comment/commentSlice';
import contactReducer from '../pages/contact/contactSlice';
import paymentReducer from '../pages/order/paymentSlice';
import staticReducer from '../pages/static/staticSlice';
import packageReducer from '../pages/membership/membershipSlice';
import teacherReducer from '../pages/teacher/teacherSlice';
import couponReducer from '../pages/order/couponSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    home: homeReducer,
    posts: postReducer,
    auth: authReducer,
    courses: courseReducer,
    category: categoryReducer,
    order: orderReducer,
    user: userReducer,
    note: noteReducer,
    learning: learningReducer,
    comment: commentReducer,
    contact: contactReducer,
    payment: paymentReducer,
    static: staticReducer,
    package: packageReducer,
    teacher: teacherReducer,
    coupon: couponReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: true
    },
    serializableCheck: false,
  }),
})
