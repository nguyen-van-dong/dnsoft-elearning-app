import reqAxios from './request';

const getComments = (lessonId) => {
  return reqAxios().get(`/comments/${lessonId}`);
}; 

const createComment = (data) => {
  return reqAxios().post('/comments/create', data);
};

const deleteComment = (id) => {
  return reqAxios().delete(`/comments/delete/${id}`);
};

const commentService = {
  getComments,
  createComment,
  deleteComment,
};
  
export default commentService;