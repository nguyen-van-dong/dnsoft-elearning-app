import reqAxios from './request';

const getCourseById = (id) => {
  return reqAxios().get(`/teacher/course/${id}`);
}

const registerPartner = (data) => {
  return reqAxios().post('/register-partner', data);
}

const teacherService = {
  getCourseById,
  registerPartner,
};

export default teacherService;
