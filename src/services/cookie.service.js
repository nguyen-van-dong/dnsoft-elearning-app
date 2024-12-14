import Cookies from 'universal-cookie';
const cookies = new Cookies();

const get = (key) => {
  return cookies.get(key);
};

const set = (key, value, options = {}) => {
  cookies.set(key, value, options);
};

const remove = (key, options = {}) => {
  cookies.remove(key, options)
};

const cookieService = {
  get,
  set,
  remove,
};
  
export default cookieService;
