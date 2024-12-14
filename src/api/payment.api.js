import reqAxios from './request';

const getPaymentMethods = () => {
  return reqAxios().get('/payment-methods');
};

const paymentService = {
  getPaymentMethods,
};

export default paymentService;
