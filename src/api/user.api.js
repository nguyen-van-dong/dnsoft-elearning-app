import reqAxios from './request';

const setting = () => {
  return reqAxios().get('/user/setting');
}

const getCourses = () => {
  return reqAxios().get('/user/courses');
};

const getUser = () => {
  return reqAxios().get('/user');
};

const updateUser = (data) => {
  return reqAxios().post('/user/update', data);
}

const userService = {
  setting,
  getCourses,
  getUser,
  updateUser,
};

export default userService;
