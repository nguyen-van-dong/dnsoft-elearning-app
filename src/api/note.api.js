import reqAxios from './request';

const getNotes = (lessonId) => {
  return reqAxios().get(`/notes/${lessonId}`);
}; 

const createNote = (data) => {
  return reqAxios().post('/notes/create', data);
};

const deleteNote = (id) => {
  return reqAxios().delete(`/notes/delete/${id}`);
};

const learningService = {
  getNotes,
  createNote,
  deleteNote,
};
  
export default learningService;