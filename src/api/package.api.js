import reqAxios from './request';

const getAllPackages = () => {
  return reqAxios().get(`/memberships`);
}

const getPackageById = (id) => {
  return reqAxios().get(`/memberships/${id}`);
}

const payment = (id) => {
  return reqAxios().get(`/memberships/payment`);
}

const packageService = {
  getAllPackages,
  getPackageById,
  payment,
};

export default packageService;
