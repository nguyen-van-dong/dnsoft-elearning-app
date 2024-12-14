import reqAxios from './request';

const applyCoupon = (data) => {
  return reqAxios().post('coupon/apply-coupon', data);
};

const getCoupon = (courseId) => {
  return reqAxios().get(`coupon/get-coupon?course_id=${courseId}`);
};

const removeCouponApplied = (data) => {
  return reqAxios().post('coupon/remove-coupon', data);
};

const couponService = {
  applyCoupon,
  getCoupon,
  removeCouponApplied,
};

export default couponService;
