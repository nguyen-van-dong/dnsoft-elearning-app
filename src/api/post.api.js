import reqAxios from './request';

const getPosts = (page) => {
  return reqAxios().get(`/blog?page=${page}`);
};

const getPostBySlug = (slug) => {
  return reqAxios().get(`/blog/${slug}`);
};

const postService = {
  getPosts,
  getPostBySlug,
};

export default postService;
