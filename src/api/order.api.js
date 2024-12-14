import reqAxios from './request';

const create = (data) => {
  return reqAxios().post('orders', data);
};

const createGuess = (data) => {
  return reqAxios().post('orders-guess', data);
};

const loadQrCode = (data) => {
  return reqAxios().post('orders/payment', data);
};

const createTransaction = (data) => {
  return reqAxios().post('orders/create-transaction', data);
};

const handleFinished = (data) => {
  return reqAxios().post('orders/handle-finished', data);
};

const applyCoupon = (data) => {
  return reqAxios().post('orders/apply-coupon', data);
};

const removeCouponApplied = (couponId) => {
  return reqAxios().post('orders/remove-coupon', couponId);
};

const handleEnrollFreeCourse = (courseId) => {
  return reqAxios().post('orders/enroll-free-course', {courseId});
};

const orderService = {
  create,
  createGuess,
  loadQrCode,
  createTransaction,
  handleFinished,
  applyCoupon,
  removeCouponApplied,
  handleEnrollFreeCourse,
};
  
export default orderService;
