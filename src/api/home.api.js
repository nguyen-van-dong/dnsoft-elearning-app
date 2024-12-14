import reqAxios from './request';

const getSliders = () => {
  return reqAxios().get('/slides');
};

const getVideoList = () => {
  return reqAxios().get('/videos');
};

const getReasonsLearn = () => {
  return reqAxios().get('/reasons-learn');
};

const homeService = {
  getSliders,
  getVideoList,
  getReasonsLearn,
};

export default homeService;
