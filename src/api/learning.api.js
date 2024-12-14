import reqAxios from './request';

const maskAsLearned = (data) => {
  return reqAxios().post('/tracking/mask-lesson-as-learned', data);
};

const setLatestLessonSelected = (data) => {
  const { course_id, uuid } = data;
  return reqAxios().post('/learning/latest-lesson-selected', {course_id, uuid});
};

const getLatestLessonSelected = (courseId) => {
  return reqAxios().get(`/learning/latest-lesson-selected/${courseId}`);
};

const getNextPrevLesson = (uuid) => {
  return reqAxios().get(`/learning/get-next-prev-lesson/${uuid}`);
};

const learningService = {
  maskAsLearned,
  getNextPrevLesson,
  setLatestLessonSelected,
  getLatestLessonSelected,
};

export default learningService;