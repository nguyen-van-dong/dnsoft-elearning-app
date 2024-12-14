import reqAxios from './request';

const getStaticPage = (page) => {
  return reqAxios().get(`/page/${page}`);
};

const staticService = {
  getStaticPage,
};

export default staticService;
