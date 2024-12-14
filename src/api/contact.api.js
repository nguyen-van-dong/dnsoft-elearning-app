import reqAxios from './request';

const getAboutMe = () => {
  return reqAxios().get('/about-me');
};

const createContact = (data) => {
  return reqAxios().post(`/contact`, data);
};

const contactService = {
  getAboutMe,
  createContact,
};

export default contactService;
