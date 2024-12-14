import reqAxios from './request';

const getAllCategories = () => {
  return reqAxios().get('/categories');
};

const getCategoriesBySlug = (slug) => {
  return reqAxios().get(`/categories/${slug}`);
};

const getPostsByCategory = (id) => {
  return reqAxios().get(`/categories/${id}`);
}

const categoryService = {
  getAllCategories,
  getCategoriesBySlug,
  getPostsByCategory
};

export default categoryService;
