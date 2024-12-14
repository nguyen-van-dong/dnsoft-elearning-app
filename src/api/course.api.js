import reqAxios from './request';

const getCourses = (category = '') => {
  return reqAxios().get(`/courses?category=${category}`);
};

const getCourseBySlug = (slug) => {
  return reqAxios().get(`/courses/${slug}`);
};

const getCourseByUuid = (uuid) => {
  return reqAxios().get(`/learning/${uuid}`);
};

const activeCourse = (data) => {
  return reqAxios().post('/courses/active', data);
}

const getAllCategories = () => {
  return reqAxios().get('/categories-course');
}

const courseService = {
  getCourses,
  getCourseBySlug,
  getCourseByUuid,
  activeCourse,
  getAllCategories,
};

export default courseService;
