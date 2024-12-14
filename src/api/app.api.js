import reqAxios from './request';

const getPaymentMethods = () => {
  return reqAxios().get('/payment-methods');
};

const checkHasAuthenticate = () => {
  return reqAxios().get('/check-has-authenticate');
};

const handleSearch = (value) => {
  return reqAxios().get(`/search?q=${value}`);
};

const appService = {
  getPaymentMethods,
  checkHasAuthenticate,
  handleSearch,
};
  
export default appService;
