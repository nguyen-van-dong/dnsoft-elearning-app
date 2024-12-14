import reqAxios from './request';

const getAllProvinces = () => {
  return reqAxios().get('/zone/provinces');
}

const getDistrictsInProvince = (province_id) => {
  return reqAxios().get(`/zone/provinces/${province_id}/districts`);
};

const getTownshipsInDistrict = (district_id) => {
  return reqAxios().get(`/zone/districts/${district_id}/townships`);
};

const zoneService = {
  getAllProvinces,
  getDistrictsInProvince,
  getTownshipsInDistrict,
};

export default zoneService;
